const express = require('express');
const { createClub } = require('../controllers/clubController');

const router = express.Router();

router.post('/', createClub);

module.exports = router;