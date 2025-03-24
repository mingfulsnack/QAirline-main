// const { default: mongoose } = require("mongoose");
const Booking = require("../models/Booking");
const Flight = require("../models/flight");
const Aircraft = require("../models/aircraft");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

class BookingController {
  // Create booking for both guest and registered users
  async createBooking(req, res) {
    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { flight_id, guest_info } = req.body;
      const userId = req.user?.id; // From authentication middleware
      console.log("User ID:", userId);
      // Find flight and check availability within transaction
      const flight = await Flight.findById(flight_id).session(session);
      if (!flight) {
        await session.abortTransaction();
        return res.status(404).json({ message: "Flight not found" });
      }

      // Check if seats are available
      if (flight.available_seats <= 0) {
        await session.abortTransaction();
        return res.status(400).json({ message: "No seats available" });
      }

      // Create booking object
      const bookingData = {
        flight_id: flight_id,
        total_amount: flight.base_price,
        status: "confirmed",
        booking_date: new Date(),
        cancellation_deadline: new Date(
          flight.scheduled_departure.getTime() - 24 * 60 * 60 * 1000
        ),
      };

      // Add user information based on authentication status
      if (userId) {
        bookingData.userId = userId;
      } else if (guest_info) {
        bookingData.guest_info = guest_info;
      } else {
        await session.abortTransaction();
        return res.status(400).json({
          message: "Guest information required for non-registered users",
        });
      }

      // Create booking within transaction
      const booking = new Booking(bookingData);
      await booking.save({ session });

      // Update flight's available seats
      flight.available_seats -= 1;
      await flight.save({ session });
      // console.log("flight", flight.aircraft_id);
      console.log("flight", flight);

      const aircraft = await Aircraft.findById(flight.aircraft_id).session(
        session
      );
      console.log("aircraft", aircraft);
      if (!aircraft) {
        await session.abortTransaction();
        return res.status(404).json({ message: "Aircraft not found" });
      }
      // 6730c3fb0e737122d16a23fe
      // 6730c3fb0e737122d16a23fe
      // Initialize total_revenue if it doesn't exist
      if (!aircraft.total_revenue) {
        aircraft.total_revenue = 0;
      }

      aircraft.total_revenue += flight.base_price;
      await aircraft.save({ session });
      // Commit transaction
      await session.commitTransaction();

      // Populate flight info and return response
      const populatedBooking = await Booking.findById(booking._id).populate(
        "flight_id"
      );

      res.status(201).json(populatedBooking);
    } catch (error) {
      // Abort transaction on error
      await session.abortTransaction();
      res.status(500).json({ message: error.message });
    } finally {
      // End session
      session.endSession();
    }
  }

  //cancel booking
  async cancelBooking(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { bookingId } = req.params;

      const booking = await Booking.findById(bookingId).session(session);
      if (!booking) {
        await session.abortTransaction();
        return res.status(404).json({ message: "Booking not found" });
      }

      // Check cancellation deadline
      if (new Date() > booking.cancellation_deadline) {
        await session.abortTransaction();
        return res.status(400).json({
          message: "Cancellation deadline passed",
        });
      }

      // Find flight and update seats
      const flight = await Flight.findById(booking.flight_id).session(session);
      if (!flight) {
        await session.abortTransaction();
        return res.status(404).json({ message: "Flight not found" });
      }

      const aircraft = await Aircraft.findById(flight.aircraft_id).session(
        session
      );

      if (!aircraft) {
        await session.abortTransaction();
        return res.status(404).json({ message: "Aircraft not found" });
      }

      aircraft.total_revenue -= booking.total_amount;

      // Update booking status and flight seats
      booking.status = "cancelled";
      flight.available_seats += 1;

      await aircraft.save({ session });
      // Save both changes within transaction
      // Log trước khi save
      console.log("Before save:", booking.status);

      await booking.save({ session });

      // Log sau khi save
      const updatedBooking = await Booking.findById(bookingId);
      console.log("After save:", updatedBooking.status);

      
      await flight.save({ session });

      // Commit transaction
      await session.commitTransaction();

      res.json({ message: "Booking cancelled successfully" });
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: error.message });
    } finally {
      session.endSession();
    }
  }
  // Admin: Update booking
  async updateBooking(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { bookingId } = req.params;
      const { status, flightId } = req.body;

      const booking = await Booking.findById(bookingId).session(session);
      if (!booking) {
        await session.abortTransaction();
        return res.status(404).json({ message: "Booking not found" });
      }

      // Handle status change to cancelled
      if (status === "cancelled" && booking.status !== "cancelled") {
        const flight = await Flight.findById(booking.flight_id).session(
          session
        );
        if (flight) {
          flight.available_seats += 1;
          await flight.save({ session });
        }
      }

      // Handle flight change
      if (flightId && flightId !== booking.flight_id.toString()) {
        // Increase seats in old flight
        const oldFlight = await Flight.findById(booking.flight_id).session(
          session
        );
        if (oldFlight) {
          oldFlight.available_seats += 1;
          await oldFlight.save({ session });
        }

        // Decrease seats in new flight
        const newFlight = await Flight.findById(flightId).session(session);
        if (!newFlight) {
          await session.abortTransaction();
          return res.status(404).json({ message: "New flight not found" });
        }
        if (newFlight.available_seats <= 0) {
          await session.abortTransaction();
          return res
            .status(400)
            .json({ message: "No seats available in new flight" });
        }
        newFlight.available_seats -= 1;
        await newFlight.save({ session });
      }

      // Update booking
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        req.body,
        { new: true, session }
      ).populate("flight_id");

      // Commit transaction
      await session.commitTransaction();

      res.json(updatedBooking);
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: error.message });
    } finally {
      session.endSession();
    }
  }

  // Get user's bookings (for registered users)
  async getUserBookings(req, res) {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("User ID:", req.user.id);
    const userId = req.user.id;
    try {
      const bookings = await Booking.find({ userId })
        .populate({
          path: "flight_id",
          populate: [
            { path: "origin_airport_id", model: "Airport" },
            { path: "destination_airport_id", model: "Airport" },
          ],
        })
        .populate("userId")
        .sort({ booking_date: -1 });
      console.log("Found bookings:", bookings.length);

      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllBookings(req, res) {
    try {
      const bookings = await Booking.find()
        .populate("flight_id") // để lấy thông tin chuyến bay
        .sort({ booking_date: -1 }); // sắp xếp theo ngày booking mới nhất

      res.json(bookings);
    } catch (error) {
      console.error("Error getting bookings:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  // Get booking by reference (for both guests and registered users)
  async getBookingByReference(req, res) {
    console.log("Query parameters:", req.query);
    const { bookingId, email } = req.query;
    console.log("Extracted values:", { bookingId, email });
    try {
      const query = {};
      if (bookingId) {
        query._id = bookingId;
      }
      if (email) {
        query["guest_info.email"] = email;
      }

      // Kiểm tra nếu không có tham số hợp lệ
      if (!bookingId && !email) {
        return res.status(400).json({ message: "Provide bookingId or email" });
      }

      // Tìm kiếm booking
      const booking = await Booking.findOne(query).populate({
        path: "flight_id",
        populate: ["origin_airport_id", "destination_airport_id"],
      });

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new BookingController();
