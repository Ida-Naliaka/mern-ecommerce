const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const AuthRoutes = require("./Routes/AuthRoutes");
const CartRoutes = require("./Routes/CartRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");
const ProductRoutes = require("./Routes/ProductRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const stripeRoute = require("./Routes/Stripe");
const mpesa = require("./Routes/mpesa");

const { notFound, errorHandler } = require("./ErrorMiddleware");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/carts", CartRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/checkout", stripeRoute);
app.use("/api/mpesa", mpesa);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });
app.use(notFound);
app.use(errorHandler);
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
