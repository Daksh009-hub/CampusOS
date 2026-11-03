const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Club name is required'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: [true, 'Club slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  fullName: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true
  },
  longDescription: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    default: 'Technical'
  },
  logoUrl: {
    type: String,
    default: ''
  },
  bannerUrl: {
    type: String,
    default: ''
  },
  vision: {
    type: String,
    default: ''
  },
  mission: {
    type: String,
    default: ''
  },
  achievements: [{
    type: String
  }],
  domains: [{
    title: { type: String, required: true },
    desc: { type: String, required: true }
  }],
  socialLinks: {
    website: { type: String, default: '' },
    email: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' },
    github: { type: String, default: '' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Club', clubSchema);
