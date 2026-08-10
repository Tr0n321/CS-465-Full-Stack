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

// POST: /api/trips
// Creates a new trip.
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    return res.status(201).json(newTrip);
  } catch (err) {
    console.error('Error creating trip:', err);

    return res.status(400).json({
      message: 'Unable to create trip',
      error: err.message
    });
  }
};

// PUT: /api/trips/:tripCode
// Updates an existing trip.
const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      code: req.params.tripCode
    }).exec();

    if (!trip) {
      return res.status(404).json({
        message: `Trip with code ${req.params.tripCode} was not found`
      });
    }

    trip.code = req.body.code ?? trip.code;
    trip.name = req.body.name ?? trip.name;
    trip.length = req.body.length ?? trip.length;
    trip.start = req.body.start ?? trip.start;
    trip.resort = req.body.resort ?? trip.resort;
    trip.perPerson = req.body.perPerson ?? trip.perPerson;
    trip.image = req.body.image ?? trip.image;
    trip.description = req.body.description ?? trip.description;

    const updatedTrip = await trip.save();

    return res.status(200).json(updatedTrip);
  } catch (err) {
    console.error('Error updating trip:', err);

    return res.status(400).json({
      message: 'Unable to update trip',
      error: err.message
    });
  }
};

// DELETE: /api/trips/:tripCode
// Deletes an existing trip.
const tripsDeleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findOneAndDelete({
      code: req.params.tripCode
    }).exec();

    if (!deletedTrip) {
      return res.status(404).json({
        message: `Trip with code ${req.params.tripCode} was not found`
      });
    }

    return res.status(200).json({
      message: `Trip ${req.params.tripCode} deleted successfully`
    });
  } catch (err) {
    console.error('Error deleting trip:', err);

    return res.status(500).json({
      message: 'Unable to delete trip',
      error: err.message
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};