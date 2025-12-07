// server.js - Node.js Backend Server with MongoDB
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const connectDB = require('./config/database');
const Registration = require('./models/Registration');
const Admin = require('./models/Admin');

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();


app.use(cors());
app.use(express.json());

app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations',
      error: error.message
    });
  }
});


app.get('/api/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration',
      error: error.message
    });
  }
});


app.post('/api/registrations', async (req, res) => {
  try {
    const { name, email, phone, organization, interests } = req.body;

    
    if (!name || !email || !phone || !organization) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, phone, organization'
      });
    }

    
    const existingReg = await Registration.findOne({ email });
    if (existingReg) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    
    const registration = new Registration({
      name,
      email,
      phone,
      organization,
      interests
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: 'Registration created successfully',
      data: registration
    });
  } catch (error) {
    console.error('Error creating registration:', error);

    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create registration',
      error: error.message
    });
  }
});


app.put('/api/registrations/:id', async (req, res) => {
  try {
    const { name, email, phone, organization, interests } = req.body;

    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, organization, interests },
      { new: true, runValidators: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      message: 'Registration updated successfully',
      data: registration
    });
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update registration',
      error: error.message
    });
  }
});


app.delete('/api/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      message: 'Registration deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete registration',
      error: error.message
    });
  }
});


app.post('/api/admin/login', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    
    const admin = await Admin.findOne({ username: 'admin' });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    
    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    
    admin.last_login = new Date();
    await admin.save();

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        username: admin.username
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});


app.get('/api/admin/stats', async (req, res) => {
  try {
    const total = await Registration.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Registration.countDocuments({
      createdAt: { $gte: today }
    });

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekCount = await Registration.countDocuments({
      createdAt: { $gte: weekAgo }
    });

    const recent = await Registration.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.json({
      success: true,
      data: {
        total,
        today: todayCount,
        thisWeek: weekCount,
        recent
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});


app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    database: 'MongoDB',
    timestamp: new Date().toISOString()
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});


app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});


app.listen(PORT, () => {
  console.log(`

Rainwater Convention API Server 
Server running on: http://localhost:${PORT}
Database: MongoDB
Status: Ready to accept requests

  `);
});


process.on('SIGINT', async () => {
  console.log('\n Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});