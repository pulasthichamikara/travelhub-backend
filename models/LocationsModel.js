const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, requird: true },
  address: { type: String, requird: true },
  country: { type: String, requird: true },
  images: [String],
  description: String,

  perks: [String],
  checkin: String,
  checkOut: String,
  maxGuests: Number,
  rooms: Number,
  bed: Number,
  bath: Number,
  perPrice: Number,
});

const LocationsModel = mongoose.model('Location', LocationSchema);
module.exports = LocationsModel;
