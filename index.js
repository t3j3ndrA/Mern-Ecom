const express = require("express");
const app = require("express")();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
app.use(cors());

// Routes importing
const usersRoute = require("./routers/users");
const authRoute = require("./routers/auth");
const productRoute = require("./routers/product");
const cartRoute = require("./routers/cart");
const orderRoute = require("./routers/order");
const checkoutRoute = require("./routers/stripe");
const razorRoute = require("./routers/razor");

// Dotenv Configuration
dotenv.config();

// Middlewares
// To use API in front-end

// To use JSON data
app.use(express.json());

// Routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/payment", razorRoute);

// DB Connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log(`DB Connection Successful`))
	.catch((e) => console.log("err :>> ", e));

// Server Listening...
const msg = `Service is running on port 5000`;
app.listen(process.env.PORT || 5000, () => console.log(msg));
