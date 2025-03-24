const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    default: function () {
      // Tạo username mặc định, ví dụ từ email
      return this.email ? this.email.split("@")[0] : null;
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
  },
  phone: {
    type: String,
  },
  date_of_birth: {
    type: Date,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema, "Users");
