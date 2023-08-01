require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const cors = require("cors");

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
}
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the mini-mood API");
});

app.use("/products", productsRouter);
app.use("/cart", cartRouter);

connect();

const port = 8000;

app.listen(port, () =>
  console.log("Server running on http://localhost:" + port)
);
