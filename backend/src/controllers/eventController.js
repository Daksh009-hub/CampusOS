const Post = require('../../models/event');

const getPostFields = (body) => {
  const fields = {};

  for (const field of ['title', 'description', 'imageUrl', 'eventDate', 'createdAt', 'createdBy']) {
    if (body[field] !== undefined) {
      fields[field] = body[field];
    }
  }

  if (fields.eventDate === undefined && body.date !== undefined) {
    fields.eventDate = body.date;
  }

  return fields;
};

// 1. CREATE EVENT
const createEvent = async (req, res) => {
  try {
    const newEvent = await Post.create(getPostFields(req.body));

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


// 2. GET ALL EVENTS
const getAllEvents = async (req, res) => {
  try {
    const events = await Post.find();

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
    const event = await Post.findById(req.params.id);

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
    const updatedEvent = await Post.findByIdAndUpdate(
      req.params.id,
      getPostFields(req.body),
      {
        new: true,
        runValidators: true
      }
    );

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