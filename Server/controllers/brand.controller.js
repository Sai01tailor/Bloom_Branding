const Brand = require("../models/brand.model");
const { uploadOnCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");

// CREATE BRAND
exports.createBrand = async (req, res) => {
  try {
    const { clientName, duration, description } = req.body;

    const images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadOnCloudinary(file.path);
        images.push({
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        });
      }
    }

    const brand = await Brand.create({
      clientName,
      duration,
      description,
      images,
    });

    res.status(201).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL BRANDS (for homepage & brand listing)
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE BRAND
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, duration, description, isActive } = req.body;

    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    if (clientName) brand.clientName = clientName;
    if (duration) brand.duration = duration;
    if (description) brand.description = description;
    if (isActive !== undefined) brand.isActive = isActive;

    if (req.files && req.files.length > 0) {
      for (const img of brand.images) {
        await deleteFromCloudinary(img.public_id);
      }

      const newImages = [];
      for (const file of req.files) {
        const uploaded = await uploadOnCloudinary(file.path);
        newImages.push({
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        });
      }

      brand.images = newImages;
    }

    await brand.save();

    res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE BRAND
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    for (const img of brand.images) {
      await deleteFromCloudinary(img.public_id);
    }

    await brand.deleteOne();

    res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
