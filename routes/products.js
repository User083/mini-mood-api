const express = require("express");
const router = express.Router();
const Products = require("../model/products.js");
const upload = require("../middleware/multer.js");
const fs = require("fs");
// import express from "express";
// import Products from "../model/products";
// import upload from "../middleware/multer";
// import * as fs from "node:fs";
// const router = express.Router();

//GET all
router.get("/", async (req, res) => {
  try {
    const products = await Products.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:category", async (req, res) => {
  const category = req.params.category.split("--")[0];
  const filter = req.params.category.split("--").pop();
  let products;
  try {
    if (filter != category) {
      products = await Products.find({
        category: `${category}`,
        collections: `${filter}`,
      });
    } else {
      products = await Products.find({
        category: `${category}`,
      });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//GET product by ID
router.get("/product/:id", async (req, res) => {
  try {
    product = await Products.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//POST new
router.post("/", upload.single("image"), async (req, res, next) => {
  const product = new Products({
    title: req.body.title,
    image: {
      data: fs.readFileSync("images/" + req.file.filename),
      contentType: "image/png",
    },
    price: req.body.price,
    category: req.body.category,
    collections: req.body.collections,
    quantity: req.body.quantity,
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
