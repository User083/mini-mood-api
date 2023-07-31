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

//GET product by ID
router.get("/:id", getProduct, async (req, res) => {
  try {
    res.status(200).json(await res.product);
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

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Products.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.product = product;
  next();
}

module.exports = router;
