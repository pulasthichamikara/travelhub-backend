const BookingModel = require('../models/BookingModel');
module.exports = {
  addBooking: async (req, res) => {
    const {
      owner,
      place,
      guestCount,
      checkin,
      checkout,
      price,
      customerName,
      customerTel,
      customerEmail,
    } = req.body;
    try {
      const booking = await BookingModel.create({
        owner,
        place,
        guestCount,
        checkin,
        checkout,
        price,
        customerName,
        customerTel,
        customerEmail,
      });
      res.status(200).json(booking);
    } catch (err) {
      res.status(300).json('something went wrong');
    }
  },
  getBookingById: async (req, res) => {
    const owner = req.user._id;

    try {
      const bookingData = await BookingModel.find({
        owner: owner,
      }).populate('place');
      console.log(bookingData);
      if (bookingData) {
        res.status(200).json(bookingData);
      } else {
        res.status(404).json('no data found');
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'something went wrong', err });
    }
  },
};
