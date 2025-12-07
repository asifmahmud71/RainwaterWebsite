const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password_hash: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  last_login: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});


adminSchema.index({ username: 1 });

module.exports = mongoose.model('Admin', adminSchema);