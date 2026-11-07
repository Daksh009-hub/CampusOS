const express = require('express');
const { upload } = require('../../cloudinaryconfig');

const {
  getAllClubs,
  getClubByIdentifier,
  createClub,
  updateClub,
  deleteClub
} = require('../controllers/clubController');

const router = express.Router();

// Error-safe multer upload middleware for logo and banner
const uploadClubImages = (req, res, next) => {
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
  ])(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Image upload failed'
      });
    }
    next();
  });
};

router.get('/', getAllClubs);
router.post('/', uploadClubImages, createClub);
router.get('/:identifier', getClubByIdentifier);
router.put('/:id', uploadClubImages, updateClub);
router.delete('/:id', deleteClub);

module.exports = router;
