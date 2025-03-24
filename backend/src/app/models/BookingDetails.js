// models/bookingDetail.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingDetailSchema = new Schema({
  booking_id: {
    type: Schema.Types.ObjectId,
    ref: "Bookings",
    required: true,
  },
  flight_seat_id: {
    type: Schema.Types.ObjectId,
    ref: "FlightSeats",
    required: true,
  },
  passenger_name: {
    type: String,
    required: true,
  },
  passenger_id_number: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model(
  "BookingDetail",
  bookingDetailSchema,
  "BookingDetails"
);
