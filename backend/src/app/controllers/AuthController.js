// controllers/AuthController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

class AuthController {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email hoặc username đã tồn tại" });
      }
      console.log("chưa có user nào trùng");
      // Create new user
      const user = new User({
        email,
        password: await bcrypt.hash(password, 10),
        role: "user",
      });
      console.log("đã tạo user");
      await user.save();
      console.log("đã lưu user");
      // Generate token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      console.log("đã tạo token");

      res.status(201).json({
        accessToken: token,
        id: user._id,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      res.status(500).json({ message: error.message + " lỗi ở đăng kí" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Email hoặc mật khẩu không đúng", email });
      }

      const isValidPassword = await bcrypt.compare(
        password,
        user.password.toString()
      );
      // let isValidPassword = false;
      // if (password === user.password) {
      //   isValidPassword = true;
      // }

      console.log(typeof user.password, typeof password, isValidPassword);
      console.log(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Pass sai" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message + "lỗi ở đăng nhập" });
    }
  }
}

// Export singleton instance
module.exports = new AuthController();
