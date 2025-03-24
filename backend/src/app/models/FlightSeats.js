// models/flightSeat.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSeatSchema = new Schema({
  flight_id: {
    type: Schema.Types.ObjectId,
    ref: "Flights",
    required: true,
  },
  seat_number: {
    type: String,
    required: true,
  },
  seat_class: {
    type: String,
    enum: ["economy", "business", "first"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "booked"],
    default: "available",
  },
});

// Compound index for unique seat numbers per flight
flightSeatSchema.index({ flight: 1, seatNumber: 1 }, { unique: true });

module.exports = mongoose.model("FlightSeat", flightSeatSchema, "FlightSeats");
