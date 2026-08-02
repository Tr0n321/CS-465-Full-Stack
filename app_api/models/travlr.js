const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    code: String,
    name: String,
    length: String,
    start: Date,
    resort: String,
    perPerson: String,
    image: String,
    description: String
});

module.exports = mongoose.model('trips', tripSchema);