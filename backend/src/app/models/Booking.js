// models/booking.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    flight_id: {
      type: Schema.Types.ObjectId,
      ref: "Flights",
      required: true,
    },
    booking_date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
    total_amount: {
      type: Number,
      required: true,
    },
    cancellation_deadline: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    }, // Optional for registered users
    guest_info: {
      // For non-registered users
      full_name: { type: String },
      email: { type: String },
      phone: { type: String },
      gender: { type: String },
      id_number: { type: String },
      address: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema, "Bookings");
