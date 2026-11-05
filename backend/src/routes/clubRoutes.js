const express = require('express');

const {
  createClub,
  getAllClubs,
  getClubByIdentifier
} = require('../controllers/clubController');

const router = express.Router();

router.post('/', createClub);

router.get('/', getAllClubs);

router.get('/:identifier', getClubByIdentifier);

module.exports = router;