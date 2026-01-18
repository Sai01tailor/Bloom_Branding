const ClientLogo = require("../models/clientLogo.model");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");

// CREATE LOGO
exports.createClientLogo = async (req, res) => {
  try {
    const { clientName } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Logo image required" });
    }

    const uploaded = await uploadOnCloudinary(req.file.path);

    const logo = await ClientLogo.create({
      clientName,
      image: {
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      },
    });

    res.status(201).json({
      success: true,
      data: logo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ACTIVE LOGOS
exports.getActiveClientLogos = async (req, res) => {
  try {
    const logos = await ClientLogo.find({ isActive: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: logos,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE LOGO
exports.updateClientLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, isActive } = req.body;

    const logo = await ClientLogo.findById(id);
    if (!logo) {
      return res.status(404).json({ success: false, message: "Logo not found" });
    }

    if (clientName) logo.clientName = clientName;
    if (isActive !== undefined) logo.isActive = isActive;

    if (req.file) {
      await deleteFromCloudinary(logo.image.public_id);

      const uploaded = await uploadOnCloudinary(req.file.path);
      logo.image = {
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      };
    }

    await logo.save();

    res.status(200).json({
      success: true,
      data: logo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE LOGO
exports.deleteClientLogo = async (req, res) => {
  try {
    const { id } = req.params;

    const logo = await ClientLogo.findById(id);
    if (!logo) {
      return res.status(404).json({ success: false, message: "Logo not found" });
    }

    await deleteFromCloudinary(logo.image.public_id);
    await logo.deleteOne();

    res.status(200).json({
      success: true,
      message: "Client logo deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
