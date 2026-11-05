const Club = require('../../models/club');

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const createClub = async (req, res) => {
  try {
    const {
      name,
      description,
      fullName,
      longDescription,
      category,
      logoUrl,
      bannerUrl,
      vision,
      mission,
      achievements,
      socialLinks,
      domains
    } = req.body || {};

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Club name and description are required'
      });
    }

    const slug = generateSlug(String(name));

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: 'Club name must contain letters or numbers'
      });
    }

    const newClub = await Club.create({
      name,
      slug,
      fullName,
      description,
      longDescription,
      category: category || 'Technical',
      logoUrl: logoUrl || '',
      bannerUrl: bannerUrl || '',
      vision,
      mission,
      achievements,
      socialLinks,
      domains
    });

    return res.status(201).json({
      success: true,
      message: 'Club created successfully',
      data: newClub
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A club with this name or slug already exists'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    console.error('Error creating club:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find().sort({ name: 1 });

    return res.status(200).json({
      success: true,
      count: clubs.length,
      message: 'Clubs fetched successfully',
      data: clubs
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getClubByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;
    let club;

    if (/^[0-9a-fA-F]{24}$/.test(identifier)) {
      club = await Club.findById(identifier);
    }

    if (!club) {
      club = await Club.findOne({ slug: identifier.toLowerCase() });
    }

    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: club
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { createClub, getAllClubs, getClubByIdentifier };