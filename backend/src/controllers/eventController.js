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

  if (!fields.title && body.name) {
    fields.title = body.name;
  }

  if (fields.eventDate === undefined && body.date !== undefined) {
    fields.eventDate = body.date;
  }

  if (!fields.club && body.organizedBy) {
    fields.club = body.organizedBy;
  }

  if (!fields.eventType && body.category) {
    fields.eventType = body.category;
  }

  const creatorId = req.user?._id || req.user?.id || body.createdBy || body.userId || body.user;

  if (creatorId && mongoose.Types.ObjectId.isValid(creatorId)) {
    fields.createdBy = creatorId;
  }

  return fields;
};

const isOwner = (req, event) => {
  const requesterId = req.body?.userId || req.query?.userId;
  return !!requesterId && String(event.createdBy) === String(requesterId);
};

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

const getAllEvents = async (req, res) => {
  try {
    const filter = {};

    if (req.query.club) {
      filter.club = String(req.query.club);
    }
    const typeFilter = req.query.eventType || req.query.category;
    if (typeFilter) {
      filter.eventType = String(typeFilter);
    }

    const events = await Post.find(filter)
      .collation({ locale: 'en', strength: 2 })
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

const updateEvent = async (req, res) => {
  try {
    const existingEvent = await Post.findById(req.params.id);

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (!isOwner(req, existingEvent)) {
      return res.status(403).json({
        success: false,
        message: 'Only the creator can edit this event'
      });
    }

    const updateData = getPostFields(req);
    delete updateData.createdBy;

    const updatedEvent = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).populate('createdBy', 'name email');

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

const deleteEvent = async (req, res) => {
  try {
    const event = await Post.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (!isOwner(req, event)) {
      return res.status(403).json({
        success: false,
        message: 'Only the creator can delete this event'
      });
    }

    await event.deleteOne();

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