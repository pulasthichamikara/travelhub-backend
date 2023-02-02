const LocationsModel = require('../models/LocationsModel');
module.exports = {
  addLocation: async (req, res) => {
    const {
      owner,
      name,
      address,
      uploaderdImgs: images,
      description,
      perks,
      checkin,
      checkOut,
      maxGuests,
    } = req.body;
    try {
      const location = await LocationsModel.create({
        owner: req.user._id,
        name,
        address,
        images,
        description,
        perks,
        checkin,
        checkOut,
        maxGuests,
      });
      if (location) {
        res.json(location);
      } else {
        res.status(500).json({
          message: 'Something went wrong. Could not create location.',
        });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  myLocations: async (req, res) => {
    const owner = req.user._id;
    try {
      const myLocations = await LocationsModel.find({ owner: owner });
      if (myLocations) {
        res.status(200).json({ myLocations });
      } else {
        res.status(404).json({ message: 'You dont have Accomadations' });
      }
    } catch (err) {
      res.status(500).json({ message: 'something went wrong' });
    }
  },
  getLocationByID: async (req, res) => {
    const id = req.params.id;
    try {
      const location = await LocationsModel.findById(id);
      res.status(200).json({ location });
    } catch (err) {
      res.status(404).json({ message: 'canot find the location' });
    }
  },
  editLocationByID: async (req, res) => {
    const id = req.params.id;
    const {
      name,
      address,
      uploaderdImgs: images,
      description,
      perks,
      checkin,
      checkOut,
      maxGuests,
    } = req.body;
    try {
      const existingLocation = await LocationsModel.findById(id);
      if (existingLocation) {
        existingLocation.name = name || existingLocation.name;
        existingLocation.address = address || existingLocation.address;
        existingLocation.checkin = checkin || existingLocation.checkin;
        existingLocation.checkOut = checkOut || existingLocation.checkOut;
        existingLocation.maxGuests = maxGuests || existingLocation.maxGuests;
        existingLocation.images = images || existingLocation.images;
        existingLocation.perks = perks || existingLocation.perks;
        existingLocation.description =
          description || existingLocation.description;
        const updatedLocation = await existingLocation.save();
        res.status(200).json(updatedLocation);
      } else {
        res.status(404).json({ message: 'Canot find the location' });
      }
    } catch (err) {
      res.status(500).json({ message: 'something went wrong', err: err });
    }
  },
  deleteLocationByID: async (req, res) => {},
};
