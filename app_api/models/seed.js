// Bring in the database connection and Trip schema.
const mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from the JSON file.
const fs = require('fs');
const trips = JSON.parse(
  fs.readFileSync('./data/trips.json', 'utf8')
);

// Delete existing records, then insert the seed data.
const seedDB = async () => {
  await Trip.deleteMany({});
  await Trip.insertMany(trips);
};

// Close the MongoDB connection and exit.
seedDB()
  .then(async () => {
    await mongoose.connection.close();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error('Database seeding failed:', err);
    await mongoose.connection.close();
    process.exit(1);
  });