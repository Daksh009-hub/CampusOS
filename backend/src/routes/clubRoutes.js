const express = require('express');
const router = express.Router();

// Get all clubs (Sirf GET route rakha hai, POST hata diya hai)
router.get('/', async (req, res) => {
  try {
   
    res.status(200).json({ 
      success: true, 
      message: "Clubs fetched successfully",
      data: [] 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;