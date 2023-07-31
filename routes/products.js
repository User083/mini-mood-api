const express = require("express");
const router = express.Router();
const Products = require("../model/products");

//GET all
router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.send(`An error has occurred => ${error}`);
    console.log(error);
  }
});

//POST new
router.post("/", async (req, res) => {
  const product = new Products({
    ...req.body,
  });
  try {
    const result = await product.save();
    res.json(result);
  } catch (error) {
    res.send(`An error has occurred => ${error}`);
  }
});

module.exports = router;
