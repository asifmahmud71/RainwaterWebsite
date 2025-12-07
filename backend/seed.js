const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Registration = require('./models/Registration');
const Admin = require('./models/Admin');

const seedDatabase = async () => {
  try {
  
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

  
    await Registration.deleteMany({});
    await Admin.deleteMany({});
    console.log('Cleared existing data');

    
    console.log(`Inserted ${registrations.length} sample registrations`);

    // Create admin user (password: admin123)
    const passwordHash = await bcrypt.hash('admin123', 10);
    await Admin.create({
      username: 'admin',
      password_hash: passwordHash,
      email: 'admin@rainwaterconvention.org'
    });
    console.log('Created admin user (username: admin, password: admin123)');

    console.log('\n Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();