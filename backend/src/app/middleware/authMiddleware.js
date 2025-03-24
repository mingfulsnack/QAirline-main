// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const Booking = require("../models/Booking");
const Flight = require("../models/flight");
require("dotenv").config();

// Xác thực token
const verifyToken = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  // console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: "Không có token xác thực" });
  }
  try {
    token = token.replace(/"/g, "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded); // Kiểm tra xem dữ liệu trong token

    // console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message); // Log lỗi chi tiết
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};

// Kiểm tra quyền admin
const isAdmin = (req, res, next) => {
  // console.log(req.user);
  // console.log(req);

  // let role = req.headers.role;
  // role = role.replace(/"/g, "");
  // console.log("role", role);
  // console.log(role == "admin");

  // console.log(req.user && req.user.role === "admin");
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Yêu cầu quyền admin" });
  }
};

// Kiểm tra quyền customer
const isCustomer = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else {
    res.status(403).json({ message: "Yêu cầu quyền user" });
  }
};

// Kiểm tra booking hợp lệ
const validateBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    if (!ObjectId.isValid(bookingId)) {
      return res
        .status(400)
        .json({ message: "ID booking không hợp lệ " + bookingId });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy booking" + req.params });
    }

    req.booking = booking;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message + " lỗi ở validateBooking" });
  }
};

// Kiểm tra thời hạn hủy vé
const checkCancellationDeadline = async (req, res, next) => {
  try {
    const booking = req.booking;
    const flight = await Flight.findById(booking.flight_id);

    // Kiểm tra thời hạn hủy (24h trước giờ khởi hành)
    const cancellationDeadline = new Date(flight.scheduled_departure);
    cancellationDeadline.setHours(cancellationDeadline.getHours() - 24);

    if (new Date() > cancellationDeadline) {
      return res
        .status(400)
        .json({ message: "Đã quá thời hạn hủy vé (24h trước giờ khởi hành)" });
    }
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message + " Lỗi ở checkCancelation Deadline" });
  }
};

// Giới hạn request
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn mỗi IP
  message: "Quá nhiều request, vui lòng thử lại sau",
});

// Xử lý lỗi
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  console.error({
    message: err.message,
    stack: err.stack,
    status: err.status || 500, // Nếu có status từ lỗi custom
    additionalInfo: err.additionalInfo, // Các thông tin lỗi thêm (nếu có)
  });
  res.status(500).json({
    message: "Có lỗi xảy ra",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

module.exports = {
  verifyToken,
  isAdmin,
  isCustomer,
  validateBooking,
  checkCancellationDeadline,
  apiLimiter,
  errorHandler,
};
