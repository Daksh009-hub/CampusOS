const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const Post = require('../../models/event');

// 1. GET User Profile by ID
const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid User ID format'
      });
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const eventsCreatedCount = await Post.countDocuments({ createdBy: id });
    const userData = user.toObject();
    userData.eventsCreatedCount = eventsCreatedCount;

    return res.status(200).json({
      success: true,
      data: userData
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

// 2. UPDATE User Profile by ID
const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid User ID format'
      });
    }

    const allowedUpdates = [
      'name',
      'rollNumber',
      'department',
      'year',
      'bio'
    ];

    const updates = {};
    for (const field of allowedUpdates) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    // Do not allow empty update
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid update fields provided'
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

// 3. GET All Users (Admin / Lead overview)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching all users:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

// 4. UPDATE User Clubs & Roles (Admin Action)
const updateUserClubs = async (req, res) => {
  try {
    const { id } = req.params;
    const { joinedClubs, role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid User ID format'
      });
    }

    const updateFields = {};
    if (Array.isArray(joinedClubs)) {
      updateFields.joinedClubs = joinedClubs;
    }
    if (role && ['student', 'lead', 'admin'].includes(role)) {
      updateFields.role = role;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User clubs and role updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user clubs:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

// 5. CREATE New User (Admin Action)
const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      rollNumber,
      department,
      year,
      role,
      joinedClubs
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      rollNumber: rollNumber ? rollNumber.trim() : '',
      department: department ? department.trim() : '',
      year: year ? year.trim() : '',
      role: ['admin', 'lead', 'student'].includes(role) ? role : 'student',
      joinedClubs: Array.isArray(joinedClubs) ? joinedClubs : []
    });

    const userObj = newUser.toObject();
    delete userObj.password;

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userObj
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};

// 6. DELETE User (Admin Action)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid User ID format'
      });
    }

    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};

// 7. RESET User Password (Admin Action with bcrypt hash)
const resetUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid User ID format'
      });
    }

    if (!newPassword || String(newPassword).trim().length < 4) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 4 characters long'
      });
    }

    // Securely hash password with bcrypt (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(String(newPassword).trim(), 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserClubs,
  createUser,
  deleteUser,
  resetUserPassword
};
