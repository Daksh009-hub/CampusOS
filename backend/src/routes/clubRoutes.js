const express = require('express');

const {
  getAllClubs,
  getClubByIdentifier
} = require('../controllers/clubController');

const router = express.Router();

router.get('/', getAllClubs);

router.get('/:identifier', getClubByIdentifier);

module.exports = router;
