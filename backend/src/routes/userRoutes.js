const express = require('express');
const {
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController');

const router = express.Router();

// GET /api/users/:id
router.get('/:id', getUserProfile);

// PUT /api/users/:id
router.put('/:id', updateUserProfile);

module.exports = router;
