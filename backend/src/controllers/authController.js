const bcrypt = require('bcryptjs');
const User = require('../../models/user');

const sanitizeUser = (user) => {
  const obj = user.toObject();
  delete obj.password;
  return obj;
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    const isMatch = user ? await bcrypt.compare(password, user.password) : false;
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: sanitizeUser(user)
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login };