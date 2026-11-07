const Club = require('../../models/club');

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// 1. GET all clubs
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

// 2. GET club by ID or Slug
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

// 3. CREATE a new club (Admin Action with file upload support)
const createClub = async (req, res) => {
  try {
    const {
      name,
      fullName,
      description,
      longDescription,
      category,
      vision,
      mission,
      socialLinks
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Club name and short description are required'
      });
    }

    const cleanName = name.trim();
    const existing = await Club.findOne({
      name: { $regex: new RegExp(`^${cleanName}$`, 'i') }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A club with this name already exists'
      });
    }

    let baseSlug = generateSlug(cleanName) || 'club';
    let slug = baseSlug;
    let counter = 1;
    while (await Club.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Determine logo and banner URLs from uploaded files or body
    let logoUrl = req.body.logoUrl ? req.body.logoUrl.trim() : '';
    let bannerUrl = req.body.bannerUrl ? req.body.bannerUrl.trim() : '';

    if (req.files) {
      if (req.files.logo && req.files.logo[0]) {
        logoUrl = req.files.logo[0].path || req.files.logo[0].secure_url || req.files.logo[0].url || logoUrl;
      }
      if (req.files.banner && req.files.banner[0]) {
        bannerUrl = req.files.banner[0].path || req.files.banner[0].secure_url || req.files.banner[0].url || bannerUrl;
      }
    }

    let parsedSocialLinks = {};
    if (socialLinks) {
      try {
        parsedSocialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
      } catch (e) {
        parsedSocialLinks = {};
      }
    }

    const newClub = await Club.create({
      name: cleanName,
      slug,
      fullName: fullName ? fullName.trim() : cleanName,
      description: description.trim(),
      longDescription: longDescription ? longDescription.trim() : '',
      category: category ? category.trim() : 'Technical',
      logoUrl,
      bannerUrl,
      vision: vision ? vision.trim() : '',
      mission: mission ? mission.trim() : '',
      socialLinks: parsedSocialLinks
    });

    return res.status(201).json({
      success: true,
      message: 'Club created successfully',
      data: newClub
    });
  } catch (error) {
    console.error('Error creating club:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};

// 4. UPDATE club (Admin Action with file upload support)
const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      fullName,
      description,
      longDescription,
      category,
      logoUrl,
      bannerUrl,
      vision,
      mission,
      socialLinks
    } = req.body;

    const club = await Club.findById(id);
    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }

    if (name && name.trim()) {
      const cleanName = name.trim();
      const existing = await Club.findOne({
        _id: { $ne: id },
        name: { $regex: new RegExp(`^${cleanName}$`, 'i') }
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Another club already uses this name'
        });
      }
      club.name = cleanName;
    }

    if (fullName !== undefined) club.fullName = fullName.trim();
    if (description !== undefined) club.description = description.trim();
    if (longDescription !== undefined) club.longDescription = longDescription.trim();
    if (category !== undefined) club.category = category.trim();
    if (vision !== undefined) club.vision = vision.trim();
    if (mission !== undefined) club.mission = mission.trim();

    // Check uploaded files
    if (req.files) {
      if (req.files.logo && req.files.logo[0]) {
        club.logoUrl = req.files.logo[0].path || req.files.logo[0].secure_url || req.files.logo[0].url;
      }
      if (req.files.banner && req.files.banner[0]) {
        club.bannerUrl = req.files.banner[0].path || req.files.banner[0].secure_url || req.files.banner[0].url;
      }
    }

    if (logoUrl !== undefined && (!req.files || !req.files.logo)) {
      club.logoUrl = logoUrl.trim();
    }
    if (bannerUrl !== undefined && (!req.files || !req.files.banner)) {
      club.bannerUrl = bannerUrl.trim();
    }

    if (socialLinks !== undefined) {
      let parsedSocialLinks = {};
      try {
        parsedSocialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
      } catch (e) {
        parsedSocialLinks = {};
      }
      club.socialLinks = {
        website: parsedSocialLinks.website ?? club.socialLinks?.website ?? '',
        email: parsedSocialLinks.email ?? club.socialLinks?.email ?? '',
        linkedin: parsedSocialLinks.linkedin ?? club.socialLinks?.linkedin ?? '',
        instagram: parsedSocialLinks.instagram ?? club.socialLinks?.instagram ?? '',
        github: parsedSocialLinks.github ?? club.socialLinks?.github ?? ''
      };
    }

    await club.save();

    return res.status(200).json({
      success: true,
      message: 'Club updated successfully',
      data: club
    });
  } catch (error) {
    console.error('Error updating club:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};

// 5. DELETE club (Admin Action)
const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Club.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Club deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting club:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};

module.exports = {
  getAllClubs,
  getClubByIdentifier,
  createClub,
  updateClub,
  deleteClub
};
