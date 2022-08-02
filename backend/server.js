import express from "express";
import dontenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dontenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.use("/api/products/", productRoutes);
app.use("/api/users/", userRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || "development";

app.listen(
  PORT,
  console.log(
    `Server running in ${environment} mode on port ${PORT}`.yellow.bold
  )
);
