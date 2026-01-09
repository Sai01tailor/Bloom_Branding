const adminModel = require("../models/admin.model");
const generateToken = require("../utils/generateToken");
const generateOtp = require("../utils/generateOtp");
const sendOtpEmail = require("../utils/sendOtpEmail");

// ================= SEND OTP =================
exports.sendSignupOtp = async (req, res) => {
  try {
    console.log("🔥 SIGNUP SEND OTP HIT");
    console.log("BODY:", req.body);

    const { username, email, password } = req.body;

    let admin = await adminModel.findOne({ email });

    if (admin && admin.isVerified) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const otp = generateOtp();

    if (!admin) {
      admin = await adminModel.create({
        username,
        email,
        password,
        otp,
        otpExpiresAt: Date.now() + 2 * 60 * 1000,
      });
    } else {
      admin.otp = otp;
      admin.otpExpiresAt = Date.now() + 2 * 60 * 1000;
      await admin.save();
    }

    await sendOtpEmail(email, otp);

    res.json({
      success: true,
      message: "OTP sent to email",
    });

  } catch (error) {
    console.error("❌ OTP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= VERIFY OTP =================
exports.verifySignupOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await adminModel.findOne({ email });

    if (!admin || admin.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (admin.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    admin.isVerified = true;
    admin.otp = undefined;
    admin.otpExpiresAt = undefined;
    await admin.save();

    res.status(200).json({
      success: true,
      verified: true,
      message: "Email verified successfully",
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        username: admin.username,   // 🔥 FIX
        email: admin.email,
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= LOGIN =================
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!admin.isVerified) {
      return res.status(403).json({ message: "Verify email first" });
    }

    res.json({
      success: true,
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        username: admin.username,   // 🔥 FIX
        email: admin.email,
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= LOGOUT =================
exports.logoutAdmin = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// ================= GET ME =================
exports.getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
