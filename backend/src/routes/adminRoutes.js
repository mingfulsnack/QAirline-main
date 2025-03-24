// routes/adminRoutes.js
const router = require("express").Router();
const AdminController = require("../app/controllers/AdminController");
const { verifyToken, isAdmin } = require("../app/middleware/authMiddleware");

router.get("/posts", AdminController.getPosts);

// router.use(verifyToken);
// router.use(isAdmin);

router.post("/posts", AdminController.createPost);
router.put("/posts/:id", AdminController.updatePost);
router.delete("/posts/:id", AdminController.deletePost);

router.get("/aircrafts", AdminController.getAllAircraft);
router.post("/aircrafts", AdminController.createAircraft);
router.put("/aircraft/:id", AdminController.updateAircraft);
router.delete("/aircraft/:id", AdminController.deleteAircraft);

router.post("/flights", AdminController.createFlight);
router.put("/flights/:flightId/delay", AdminController.updateFlightTime);

router.get("/bookings/statistics", AdminController.getBookingStatistics);

module.exports = router;
