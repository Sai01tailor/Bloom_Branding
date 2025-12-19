const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepage.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public
router.get("/", homepageController.getHomepage);

// Admin 
router.post("/",authMiddleware,homepageController.upsertHomepage);

module.exports = router;
