// controllers/AdminController.js
const Post = require("../models/Post");
const Aircraft = require("../models/aircraft");
const Flight = require("../models/flight");
const Booking = require("../models/Booking");

class AdminController {
  async getPosts(req, res) {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // Admin: Create airline information post
  async createPost(req, res) {
    try {
      const { title, subtitle, content, cover_url } = req.body;

      if (!cover_url.startsWith("data:image")) {
        return res.status(400).json({
          success: false,
          error: "Invalid image format",
        });
      }
      const post = new Post({
        title,
        subtitle,
        content,
        cover_url,
      });
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message + "cant create post" });
    }
  }

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, subtitle, content, cover_url } = req.body;

      if (cover_url && !cover_url.startsWith("data:image")) {
        return res.status(400).json({
          success: false,
          error: "Invalid image format",
        });
      }

      const post = await Post.findByIdAndUpdate(
        id,
        { title, subtitle, content, cover_url },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete post
  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndDelete(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Admin: Create aircraft
  async createAircraft(req, res) {
    const {
      aircraft_code,
      manufacturer,
      model,
      total_seats,
      manufacture_date,
    } = req.body;
    try {
      const aircraft = new Aircraft({
        aircraft_code,
        manufacturer,
        model,
        total_seats,
        manufacture_date,
      });
      await aircraft.save();
      res.status(201).json(aircraft);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Admin: Create flight
  async createFlight(req, res) {
    const {
      flight_number,
      origin_airport_id,
      destination_airport_id,
      scheduled_departure,
      scheduled_arrival,
      status,
      base_price,
      available_seats,
    } = req.body;
    console.log(req.body);
    try {
      const flight = new Flight({
        flight_number,
        origin_airport_id,
        destination_airport_id,
        scheduled_departure,
        scheduled_arrival,
        status,
        base_price,
        available_seats,
      });
      console.log("save fail???");
      await flight.save();
      console.log("save success");
      res.status(201).json(flight);
    } catch (error) {
      res.status(500).json({ message: error.message + " day loi o day" });
    }
  }

  // Admin: Update flight time (delay)
  async updateFlightTime(req, res) {
    const { flightId } = req.params;
    console.log(req.params);
    console.log(req.body);
    const { scheduled_departure, scheduled_arrival } = req.body;

    try {
      const flight = await Flight.findById(flightId);
      if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
      }

      flight.scheduled_departure = scheduled_departure;
      flight.scheduled_arrival = scheduled_arrival;
      await flight.save();
      res.json(flight);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllAircraft(req, res) {
    try {
      const aircraft = await Aircraft.find().sort({ aircraftCode: 1 });
      res.json(aircraft);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Admin: Update aircraft
  async updateAircraft(req, res) {
    try {
      const { id } = req.params;
      const {
        aircraft_code,
        manufacturer,
        model,
        total_seats,
        manufacture_date,
      } = req.body;

      const aircraft = await Aircraft.findByIdAndUpdate(
        id,
        {
          aircraft_code,
          manufacturer,
          model,
          total_seats,
          manufacture_date,
        },
        { new: true }
      );

      if (!aircraft) {
        return res.status(404).json({ message: "Aircraft not found" });
      }

      res.json(aircraft);
    } catch (error) {
      res.status(500).json({
        message: error.message,
        error: "Error updating aircraft information",
      });
    }
  }

  // Admin: Delete aircraft
  async deleteAircraft(req, res) {
    try {
      const { id } = req.params;

      console.log(req.params);
      // Kiểm tra xem tàu bay có đang được sử dụng trong chuyến bay nào không
      // const hasFlights = await Aircraft.exists({ aircraft: _id });
      // if (hasFlights) {
      //   return res.status(400).json({
      //     message: "Cannot delete aircraft that is associated with flights",
      //   });
      // }

      const aircraft = await Aircraft.findByIdAndDelete(id);

      if (!aircraft) {
        return res.status(404).json({ message: "Aircraft not found" });
      }

      res.json({
        message: "Aircraft deleted successfully",
        deleted_aircraft: aircraft,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        error: "Error deleting aircraft",
      });
    }
  }

  // Admin: View booking statistics
  async getBookingStatistics(req, res) {
    try {
      // Get booking status statistics
      const bookingStats = await Booking.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            totalRevenue: { $sum: "$total_amount" },
          },
        },
      ]);

      // Get aircraft revenue statistics
      const aircraftStats = await Aircraft.aggregate([
        {
          $lookup: {
            from: "Flights",
            localField: "_id",
            foreignField: "aircraft_id",
            as: "flights",
          },
        },
        {
          $lookup: {
            from: "Bookings",
            localField: "flights._id",
            foreignField: "flight_id",
            as: "bookings",
          },
        },
        {
          $project: {
            aircraft_code: 1,
            manufacturer: 1,
            model: 1,
            total_seats: 1,
            manufacture_date: 1,
            total_revenue: 1,
            total_flights: { $size: "$flights" },
            total_bookings: { $size: "$bookings" },
            active_bookings: {
              $size: {
                $filter: {
                  input: "$bookings",
                  as: "booking",
                  cond: { $eq: ["$$booking.status", "confirmed"] },
                },
              },
            },
          },
        },
        {
          $project: {
            aircraft_code: 1,
            manufacturer: 1,
            model: 1,
            total_seats: 1,
            manufacture_date: 1,
            total_revenue: 1,
            total_flights: 1,
            total_bookings: 1,
            active_bookings: 1,
            utilization_rate: {
              $cond: {
                if: {
                  $and: [
                    { $ne: ["$total_flights", 0] },
                    { $ne: ["$total_seats", 0] },
                    {
                      $ne: [
                        { $multiply: ["$total_flights", "$total_seats"] },
                        0,
                      ],
                    },
                  ],
                },
                then: {
                  $multiply: [
                    {
                      $divide: [
                        "$active_bookings",
                        { $multiply: ["$total_flights", "$total_seats"] },
                      ],
                    },
                    100,
                  ],
                },
                else: 0,
              },
            },
          },
        },
        {
          $sort: { total_revenue: -1 },
        },
      ]);

      // Get monthly revenue trend
      const monthlyRevenue = await Booking.aggregate([
        {
          $match: {
            status: "confirmed",
            booking_date: {
              $gte: new Date(
                new Date().setFullYear(new Date().getFullYear() - 1)
              ),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$booking_date" },
              month: { $month: "$booking_date" },
            },
            revenue: { $sum: "$total_amount" },
            bookings: { $sum: 1 },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

      // Calculate summary statistics
      const summary = {
        total_aircraft: aircraftStats.length,
        total_revenue: aircraftStats.reduce(
          (sum, aircraft) => sum + (aircraft.total_revenue || 0),
          0
        ),
        average_revenue_per_aircraft:
          aircraftStats.length > 0
            ? aircraftStats.reduce(
                (sum, aircraft) => sum + (aircraft.total_revenue || 0),
                0
              ) / aircraftStats.length
            : 0,
        highest_revenue_aircraft:
          aircraftStats.length > 0 ? aircraftStats[0] : null,
        total_confirmed_bookings:
          bookingStats.find((stat) => stat._id === "confirmed")?.count || 0,
        total_cancelled_bookings:
          bookingStats.find((stat) => stat._id === "cancelled")?.count || 0,
      };

      res.json({
        summary,
        booking_stats: bookingStats,
        aircraft_stats: aircraftStats,
        monthly_revenue: monthlyRevenue,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AdminController();
