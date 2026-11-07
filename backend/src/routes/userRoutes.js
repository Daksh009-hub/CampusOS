const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserClubs,
  createUser,
  deleteUser,
  resetUserPassword
} = require('../controllers/userController');

const router = express.Router();

// GET /api/users (List all users)
router.get('/', getAllUsers);

// POST /api/users (Admin: Create a new user)
router.post('/', createUser);

// GET /api/users/:id
router.get('/:id', getUserProfile);

// PUT /api/users/:id
router.put('/:id', updateUserProfile);

// DELETE /api/users/:id (Admin: Delete a user)
router.delete('/:id', deleteUser);

// PUT /api/users/:id/clubs (Admin: manage user's clubs & role)
router.put('/:id/clubs', updateUserClubs);

// PUT /api/users/:id/reset-password (Admin: reset user password with bcrypt)
router.put('/:id/reset-password', resetUserPassword);

module.exports = router;
