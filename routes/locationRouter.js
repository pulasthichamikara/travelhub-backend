const express = require('express');
const {
  addLocation,
  myLocations,
  getLocationByID,
  editLocationByID,
  deleteLocationByID,
  allLocations,
} = require('../controllers/locationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addLocation);
router.get('/myaccomadations', protect, myLocations);
router.get('/allaccomadations', allLocations);
router
  .route('/:id')
  .get(getLocationByID)
  .put(protect, editLocationByID)
  .delete(protect, deleteLocationByID);

module.exports = router;
