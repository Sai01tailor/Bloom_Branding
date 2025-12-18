const adminModel = require("../models/admin.model");
const generateToken = require("../utils/generateToken");


exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;


    const existAdmin = await adminModel.findOne({ email });
    if (existAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }


    const admin = await adminModel.create({
      username,
      email,
      password
    });

    res.status(201).json({
      success: true,
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      success: true,
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
