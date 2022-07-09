const express = require("express");
const dontenv = require("dotenv");
const products = require("./data/products");

dontenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || "development";

app.listen(
  PORT,
  console.log(`Server running in ${environment} mode on port ${PORT}`)
);