const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
dotenv.config();
const productsRouter = require("./routes/products.js");
const cartRouter = require("./routes/cart.js");
const PORT = process.env.PORT || 3000;
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the mini-mood API");
});

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
connect().then(() => {
  app.listen(PORT, () => console.log("Server listening"));
});
