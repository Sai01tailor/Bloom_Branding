console.log("app.js loaded");

const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/admin.route");
const offerRoutes = require("./routes/offer.route");
const homepageRoutes = require("./routes/homepage.route");

const app = express();

/* =======================
   🔹 CORS CONFIG (FIXED)
   ======================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =======================
   🔹 MIDDLEWARE
   ======================= */
app.use(express.json());

/* =======================
   🔹 ROUTES
   ======================= */
app.use("/admin", adminRoutes);
app.use("/offers", offerRoutes);
app.use("/homepage", homepageRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

module.exports = app;
