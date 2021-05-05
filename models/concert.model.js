const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema({
  day: { type: String, required: true },
  performer: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Concert", concertSchema);