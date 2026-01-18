const offerModel = require("../models/offer.model");
const clientLogoModel = require("../models/clientLogo.model");

exports.createOffer = async (req, res) => {
  try {
    const offer = await offerModel.create(req.body);
    res.status(201).json({ success: true, data: offer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateOffer = async (req, res) => {
  try {
    const offer = await offerModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });
    }

    res.json({ success: true, data: offer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete
exports.disableOffer = async (req, res) => {
  try {
    const offer = await offerModel.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });
    }

    res.json({ success: true, data: offer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// public
exports.getActiveOffers = async (req, res) => {
  try {
    const offers = await offerModel.find({ isActive: true }).sort({ order: 1 });

    const clientLogos = await clientLogoModel
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(18);

    res.json({
      success: true,
      data: {
        offers,
        clientLogos,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// admin
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await offerModel.find().sort({ order: 1 });

    // all info for clientLogo for Admin 
    const clientLogos = await clientLogoModel
      .find({})
      .sort({ createdAt: -1 })
  
      res.json({
      success: true,
      data: {
        offers,
        clientLogos,
      },
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
