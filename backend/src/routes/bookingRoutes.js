const express = require("express");
const router = express.Router();
const bookingController = require("../app/controllers/BookingController");
const {
  verifyToken,
  isCustomer,
  validateBooking,
  checkCancellationDeadline,
  apiLimiter,
} = require("../app/middleware/authMiddleware");

// Public routes (không cần đăng nhập)
router.post("/createBooking", apiLimiter, bookingController.createBooking); // Đặt vé
router.get(
  "/searchBooking",
  apiLimiter,
  bookingController.getBookingByReference
); // Tra cứu booking bằng ID và email

router.patch("/:bookingId/cancel", apiLimiter, bookingController.cancelBooking); // Hủy vé cho khách vãng lai

router.get("/getAllBookings", bookingController.getAllBookings); // Xem tất cả booking (admin)
// Routes cho user đã đăng nhập
router.use("/user", verifyToken, isCustomer); // Middleware cho tất cả routes /user
router.get("/user/getBooking", bookingController.getUserBookings); // Xem lịch sử đặt vé
router.post("/user/createBooking", bookingController.createBooking); // Đặt vé với tài khoản

router.post(
  "/user/:bookingId/cancel",
  validateBooking,
  checkCancellationDeadline,
  bookingController.cancelBooking
); // Hủy vé

module.exports = router;
