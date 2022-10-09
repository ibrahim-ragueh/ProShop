import path from "path";
import express from "express";
import dontenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dontenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
};

// A middleware in order to parse the req.body in userController.js & it is called body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.use("/api/products/", productRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/upload", uploadRoutes);

// uploads folder is not accessable by default -->
// --> and needed to be made static folder so that it can get loaded in the browser
// join is used to join different segments of files
// __dirname indicates the current folder
const __dirname = path.resolve(); // To mimic (__dirname) as it is only available in common js & not in ES syntax
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

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
