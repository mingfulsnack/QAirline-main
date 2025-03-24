// models/aircraft.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aircraftSchema = new Schema({
  aircraft_code: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  total_seats: {
    type: Number,
    required: true,
    min: 1,
  },
  manufacture_date: {
    type: Date,
    required: true,
  },
  total_revenue: {
    type: Number,
  },
});

module.exports = mongoose.model("Aircraft", aircraftSchema, "Aircrafts");
