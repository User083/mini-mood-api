const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: String,
  category: String,
  collections: Array,
  quantity: Number,
});

module.exports = mongoose.model("Cart", cartSchema);
