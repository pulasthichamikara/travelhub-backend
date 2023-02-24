const { image } = require('image-downloader');
const LocationsModel = require('../models/LocationsModel');
const { deleteBulkImages } = require('./imageController');
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
      perPrice,
      rooms,
      bed,
      bath,

      country,
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
        perPrice,
        rooms,
        bed,
        bath,

        country,
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
  allLocations: async (req, res) => {
    try {
      const queryParams = req.query;
      const searchParams = {};
      const perPage = queryParams.hasOwnProperty('perPage')
        ? Number(queryParams.perPage)
        : 10;
      const page = Number(queryParams.page) || 1;

      // Sanitize and validate input parameters
      if (queryParams.country) {
        searchParams.country = queryParams.country.trim();
      }

      if (queryParams.guestCount) {
        const guestCount = parseInt(queryParams.guestCount);
        if (!isNaN(guestCount)) {
          searchParams.maxGuests = { $gt: guestCount - 1 };
        }
      }
      console.log(searchParams);
      const allLocations = await LocationsModel.find(searchParams)
        .limit(perPage)
        .skip((page - 1) * perPage);
      const allLocationsCount = await LocationsModel.count(searchParams);
      const pages = Math.ceil(allLocationsCount / perPage);
      return res.status(200).json({ allLocations, pages });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong' });
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
      perPrice,
      deletedImages,
      rooms,
      bed,
      bath,

      country,
    } = req.body;

    if (deletedImages.length) {
      deleteBulkImages(deletedImages);
    }
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
        existingLocation.perPrice = perPrice || existingLocation.perPrice;
        existingLocation.rooms = rooms || existingLocation.rooms;
        existingLocation.bed = bed || existingLocation.bed;
        existingLocation.bath = bath || existingLocation.bath;

        existingLocation.country = country || existingLocation.country;
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
  deleteLocationByID: async (req, res) => {
    const { id } = req.body;

    try {
      const existingLoacation = await LocationsModel.findById(id);
      if (existingLoacation) {
        const images = existingLoacation.images;
        if (images.length) {
          await deleteBulkImages(images);
        }
        await LocationsModel.findByIdAndRemove(id);
        res.status(200).json(id);
      } else {
        res.status(404).json('canot find the location');
      }
    } catch (err) {
      res.status(500).json({ message: 'something went wrong', err: err });
    }
  },
};
