// routes/authRoutes.js
const router = require("express").Router();
const AuthController = require("../app/controllers/AuthController");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;
