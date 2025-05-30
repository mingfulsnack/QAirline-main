// routes/adminRoutes.js

// api/admin

const router = require("express").Router();
const AdminController = require("../app/controllers/AdminController");
const { verifyToken, isAdmin } = require("../app/middleware/authMiddleware");

router.get("/posts", AdminController.getPosts);

router.use(verifyToken); // yêu cầu đăng nhập
router.use(isAdmin); // yêu cầu quyền admin cho tất cả các route /api/admin

router.post("/posts", AdminController.createPost);
router.put("/posts/:id", AdminController.updatePost);
router.delete("/posts/:id", AdminController.deletePost);

router.get("/aircrafts", AdminController.getAllAircraft);
router.post("/aircrafts", AdminController.createAircraft);
router.put("/aircraft/:id", AdminController.updateAircraft);
router.delete("/aircraft/:id", AdminController.deleteAircraft);

router.post("/flights", AdminController.createFlight);
router.put("/flights/:flightId/delay", AdminController.updateFlightTime);
router.delete("/flights/:flightId", AdminController.deleteFlight);

router.get("/bookings/statistics", AdminController.getBookingStatistics);

module.exports = router;
