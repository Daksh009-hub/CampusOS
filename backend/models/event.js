const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    clubId: {
      type: String,
      required: true
    },

    imageUrl: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);