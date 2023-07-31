const express = require("express");
const router = express.Router();
const Products = require("../model/products");

//GET all
router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//POST new
router.post("/", async (req, res) => {
  const product = new Products({
    ...req.body,
  });
  try {
    const result = await product.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
