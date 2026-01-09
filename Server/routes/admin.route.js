const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const isAuthenticated  = require("../middleware/auth.middleware");

router.post("/signup-send-otp", adminController.sendSignupOtp);
router.post("/signup-verify-otp", adminController.verifySignupOtp);
router.post("/login", adminController.loginAdmin);
router.get("/logout", isAuthenticated, adminController.logoutAdmin);
router.get("/me", isAuthenticated, adminController.getMe);
module.exports = router;
