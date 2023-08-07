const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  item: String,
  price: String,
  quantity: Number,
});

module.exports = mongoose.model("Cart", cartSchema);
