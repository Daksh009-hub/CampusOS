const Club = require('../../models/club');

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
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

module.exports = { getAllClubs, getClubByIdentifier };