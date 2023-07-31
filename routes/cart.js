const express = require("express");
const router = express.Router();
const Cart = require("../model/cart");

//GET all
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//POST new
router.post("/", async (req, res) => {
  const product = new Cart({
    ...req.body,
  });
  try {
    const result = await product.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE from cart
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await res.cart.deleteOne();
    res.json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Cart.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.cart = product;
  next();
}
module.exports = router;
