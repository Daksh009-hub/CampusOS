const express = require('express');
const { upload } = require('../../cloudinaryconfig');

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

const router = express.Router();

// Error-safe multer upload middleware
const uploadImage = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Image upload failed'
      });
    }
    next();
  });
};

// Create event
router.post('/', uploadImage, createEvent);

// Get all events
router.get('/', getAllEvents);

// Get single event
router.get('/:id', getEventById);

// Update event
router.put('/:id', uploadImage, updateEvent);

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;
