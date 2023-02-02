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
};
