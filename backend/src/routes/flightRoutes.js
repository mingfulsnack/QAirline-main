// routes/flightRoutes.js
const router = require("express").Router();
const FlightController = require("../app/controllers/FlightController");

router.get("/", FlightController.getAllFlights);
router.get("/search", FlightController.searchFlights);
router.get("/airports", FlightController.getAllAirports);
module.exports = router;
