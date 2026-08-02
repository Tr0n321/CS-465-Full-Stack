const Trip = require('../models/travlr');

// GET: /api/trips
// Returns all trips.
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();

    if (!trips || trips.length === 0) {
      return res.status(404).json({
        message: 'No trips found'
      });
    }

    return res.status(200).json(trips);
  } catch (err) {
    console.error('Error retrieving trips:', err);

    return res.status(500).json({
      message: 'Unable to retrieve trips',
      error: err.message
    });
  }
};

// GET: /api/trips/:tripCode
// Returns one trip matching the supplied trip code.
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      code: req.params.tripCode
    }).exec();

    if (!trip) {
      return res.status(404).json({
        message: `Trip with code ${req.params.tripCode} was not found`
      });
    }

    return res.status(200).json(trip);
  } catch (err) {
    console.error('Error retrieving trip:', err);

    return res.status(500).json({
      message: 'Unable to retrieve trip',
      error: err.message
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};