const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Event title is required'],
    trim: true 
  },
  description: { 
    type: String, 
    required: [true, 'Event description is required'],
    trim: true 
  },
  imageUrl: { 
    type: String,
    default: ''
  },
  eventDate: { 
    type: Date,
  },
  time: {
    type: String,
    trim: true,
    default: ''
  },
  venue: {
    type: String,
    trim: true,
    default: ''
  },
  club: {
    type: String,
    trim: true,
    default: ''
  },
  eventType: {
    type: String,
    trim: true,
    default: 'General'
  },
  registrationLink: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Event creator user ID is required']
  }
});

module.exports = mongoose.model('Event', eventSchema);
