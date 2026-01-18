
console.log("app.js loaded");

const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/admin.route");
const offerRoutes = require("./routes/offer.route");
const homepageRoutes = require("./routes/homepage.route");
const testimonialRoutes = require('./routes/testimonial.route');
const enquiryRoutes = require('./routes/enquiry.route');
const jobApplicationRoutes = require("./routes/jobApplication.route");
const brandRoutes=require('./routes/brand.route');
const clientLogosRoutes=require('./routes/clientLogo.route');
const projectRoutes = require("./routes/project.route");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// routes (APIs)
app.use("/api/admin", adminRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/homepage", homepageRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/job-applications', jobApplicationRoutes);
app.use('/api/brands',brandRoutes);
app.use('/api/clientLogos',clientLogosRoutes);
app.use("/api/projects", projectRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


module.exports = app;