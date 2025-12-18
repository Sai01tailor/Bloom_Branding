
console.log("app.js loaded");

const express = require("express");

const adminRoutes = require("./routes/admin.route");


const app = express();

// middleware
app.use(express.json());

// routes (APIs)
app.use("/admin", adminRoutes);


// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

module.exports = app;
