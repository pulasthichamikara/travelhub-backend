const express = require('express');
const { addLocation } = require('../controllers/locationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addLocation);

module.exports = router;
