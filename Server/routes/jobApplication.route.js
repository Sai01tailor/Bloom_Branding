const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  createJobApplication,
  getAllJobApplications,
  deleteJobApplication,
} = require("../controllers/jobApplication.controller");

router.post("/",createJobApplication);
router.get("/admin",  authMiddleware,getAllJobApplications);
router.delete("/admin/:id", authMiddleware, deleteJobApplication);

module.exports = router;
