const mongoose = require('mongoose');
const { Schema } = mongoose;

const BoooingSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  guestCount: Number,
  checkin: Date,
  checkout: Date,
  price: Number,
  customerName: String,
  customerTel: String,
  customerEmail: String,
});

const BookingModel = mongoose.model('booking', BoooingSchema);
module.exports = BookingModel;
