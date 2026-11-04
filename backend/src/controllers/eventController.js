const Post = require('../../models/event');
const User = require('../../models/user');
const mongoose = require('mongoose');

const getPostFields = (req) => {
  const body = req.body || {};
  const fields = {};

  const allowedFields = [
    'title',
    'description',
    'imageUrl',
    'eventDate',
    'time',
    'venue',
    'club',
    'eventType',
    'registrationLink',
    'createdAt'
  ];

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      fields[field] = body[field];
    }
  }

  // Fallback aliases
  if (!fields.title && body.name) {
    fields.title = body.name;
  }

  if (fields.eventDate === undefined && body.date !== undefined) {
    fields.eventDate = body.date;
  }

  if (!fields.club && body.organizedBy) {
    fields.club = body.organizedBy;
  }

  // If category is provided, map to eventType
  if (!fields.eventType && body.category) {
    fields.eventType = body.category;
  }

  // Determine user ObjectId for createdBy
  const creatorId = req.user?._id || req.user?.id || body.createdBy || body.userId || body.user;

  if (creatorId && mongoose.Types.ObjectId.isValid(creatorId)) {
    fields.createdBy = creatorId;
  }

  return fields;
};

// 1. CREATE EVENT
const createEvent = async (req, res) => {
  try {
    const eventData = getPostFields(req);

    if (!eventData.createdBy) {
      return res.status(400).json({
        success: false,
        message: 'Valid User ID (createdBy or userId) is required'
      });
    }

    const newEvent = await Post.create(eventData);

    // Populate user info before returning response
    await newEvent.populate('createdBy', 'name email');

    return res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: newEvent
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// 2. GET ALL EVENTS (Optional query filters by club / eventType / category)
const getAllEvents = async (req, res) => {
  try {
    const filter = {};

    if (req.query.club) {
      filter.club = new RegExp(req.query.club, 'i');
    }
    const typeFilter = req.query.eventType || req.query.category;
    if (typeFilter) {
      filter.eventType = new RegExp(typeFilter, 'i');
    }

    const events = await Post.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// 3. GET SINGLE EVENT
const getEventById = async (req, res) => {
  try {
    const event = await Post.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: event
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid event ID'
    });
  }
};


// 4. UPDATE EVENT
const updateEvent = async (req, res) => {
  try {
    const updateData = getPostFields(req);

    const updatedEvent = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).populate('createdBy', 'name email');

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// 5. DELETE EVENT
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Post.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid event ID'
    });
  }
};


module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
