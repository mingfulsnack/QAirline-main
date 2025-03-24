// models/postCategory.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

module.exports = mongoose.model(
  "PostCategory",
  postCategorySchema,
  "PostCategories"
);
