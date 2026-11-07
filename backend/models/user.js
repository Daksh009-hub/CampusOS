const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'User email is required'], 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required']
  },
  rollNumber: {
    type: String,
    trim: true,
    default: ''
  },
  department: {
    type: String,
    trim: true,
    default: ''
  },
  year: {
    type: String,
    trim: true,
    default: ''
  },
  bio: {
    type: String,
    trim: true,
    default: ''
  },
  role: {
    type: String,
    enum: ['student', 'lead', 'admin'],
    default: 'student',
    trim: true
  },
  // Optional joined clubs list (name & role only)
  joinedClubs: {
    type: [
      {
        name: { 
          type: String, 
          trim: true 
        },
        role: { 
          type: String, 
          trim: true,
          default: 'Member' 
        }
      }
    ],
    default: []
  },
  eventsAttended: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
