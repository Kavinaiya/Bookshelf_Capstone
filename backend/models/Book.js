const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  thumbnail: { type: String },
  ratings: [Number],
  reviews: [{ user: String, review: String }],
});

module.exports = mongoose.model("Book", bookSchema);
