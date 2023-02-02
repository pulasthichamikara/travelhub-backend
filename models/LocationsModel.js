const mongoose = require('mongoose');
const { Schema } = mongoose;
const { protect } = require('../middleware/authMiddleware');
const LocationSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, requird: true },
  address: { type: String, requird: true },
  images: [String],
  description: String,
  perks: [String],
  checkin: String,
  checkOut: String,
  maxGuests: Number,
});

const LocationsModel = mongoose.model('Location', LocationSchema);
module.exports = LocationsModel;
