const {
  addBooking,
  getBookingById,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { route } = require('./locationRouter');

const express = require('express');

const router = express.Router();
router.post('/', protect, addBooking);
router.get('/', protect, getBookingById);

module.exports = router;
