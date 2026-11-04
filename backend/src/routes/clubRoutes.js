const express = require('express');
const router = express.Router();
const Club = require('../../models/club');

// 1. Get all clubs from MongoDB
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find().sort({ name: 1 });

    res.status(200).json({ 
      success: true, 
      count: clubs.length,
      message: "Clubs fetched successfully",
      data: clubs 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Get single club by slug or ID (e.g. /api/clubs/gdgc or /api/clubs/:id)
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;

    let club;
    // Check if identifier is a valid 24-character hex ObjectId
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      club = await Club.findById(identifier);
    }

    // Otherwise find by slug
    if (!club) {
      club = await Club.findOne({ slug: identifier.toLowerCase() });
    }

    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }

    res.status(200).json({
      success: true,
      data: club
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
