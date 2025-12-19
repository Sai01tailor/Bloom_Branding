
console.log("app.js loaded");

const express = require("express");

const adminRoutes = require("./routes/admin.route");
const offerRoutes = require("./routes/offer.route");
const homepageRoutes = require("./routes/homepage.route");
const app = express();

// middleware
app.use(express.json());

// routes (APIs)
app.use("/admin", adminRoutes);
app.use("/offers", offerRoutes);
app.use("/homepage", homepageRoutes);
// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


module.exports = app;
