const Flight = require("../models/flight");
const Airport = require("../models/airport");

class FlightController {
  async getAllFlights(req, res) {
    try {
      console.log("Fetching flights from database...");

      const flights = await Flight.find()
        .populate({
          path: "origin_airport_id",
          select: "airport_code airport_name city", // Lấy các trường cần thiết từ Airport
        })
        .populate({
          path: "destination_airport_id",
          select: "airport_code airport_name city", // Lấy các trường cần thiết từ Airport
        })
        .lean();

      console.log("Found flights:", flights.length);
      if (!flights.length) {
        return res.status(404).json({
          message: "Không tìm thấy chuyến bay nào trong database",
        });
      }

      res.json(flights);
    } catch (error) {
      console.error("Error fetching flights:", error);
      res.status(500).json({ message: error.message });
    }
  }
  async getAllAirports(req, res) {
    try {
      console.log("Fetching airports from database...");

      const airports = await Airport.find().lean();

      console.log("Found airports:", airports.length);
      if (!airports.length) {
        return res.status(404).json({
          message: "Không tìm thấy sân bay nào trong database",
        });
      }

      res.json(airports);
    } catch (error) {
      console.error("Error fetching airports:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async searchFlights(req, res) {
    try {
      const { origin, destination, date } = req.query;

      // Kiểm tra nếu thiếu các tham số cần thiết
      if (!origin || !destination) {
        return res.status(400).json({
          message: "Cần cung cấp mã sân bay xuất phát và mã sân bay đến",
        });
      }

      // Xây dựng query tìm kiếm với populate conditions
      let query = {};

      // Thêm điều kiện tìm kiếm cho populate
      const populateOptions = [
        {
          path: "origin_airport_id",
          match: { airport_code: origin },
          select: "airport_code airport_name city",
        },
        {
          path: "destination_airport_id",
          match: { airport_code: destination },
          select: "airport_code airport_name city",
        },
      ];

      // Kiểm tra ngày đi (date) và tạo phạm vi ngày tìm kiếm
      if (date) {
        const searchDate = new Date(date);
        searchDate.setHours(0, 0, 0, 0);
        const nextDay = new Date(searchDate);
        nextDay.setDate(nextDay.getDate() + 1);

        query.scheduled_departure = {
          $gte: searchDate,
          $lt: nextDay,
        };
      }

      // Tìm tất cả chuyến bay và populate thông tin sân bay
      const flights = await Flight.find(query)
        .populate(populateOptions[0])
        .populate(populateOptions[1])
        .lean();

      // Lọc kết quả sau khi populate để chỉ lấy các chuyến bay phù hợp
      const filteredFlights = flights.filter(
        (flight) => flight.origin_airport_id && flight.destination_airport_id
      );

      if (!filteredFlights.length) {
        return res.status(404).json({
          message: `Không tìm thấy chuyến bay nào phù hợp với tiêu chí tìm kiếm ${origin} -> ${destination}`,
        });
      }

      res.json(filteredFlights);
    } catch (error) {
      console.error("Error searching flights:", error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new FlightController();
