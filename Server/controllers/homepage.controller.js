const Homepage = require("../models/homepage.model");


exports.getHomepage = async (req, res) => {
  try {
    const homepage = await Homepage.findOne()
      .populate("featuredServices"); 

    if (!homepage) {
      return res.status(200).json({
        success: true,
        data: null,
        message: "Homepage not created yet"
      });
    }

    res.status(200).json({
      success: true,
      data: homepage
    });
  } catch (error) {
    console.error("Homepage fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Homepage fetch failed"
    });
  }
};

exports.upsertHomepage = async (req, res) => {
  try {
    const homepage = await Homepage.findOneAndUpdate(
      {},               
      req.body,         
      {
        new: true,        
        upsert: true      
      }
    );

    res.status(200).json({
      message: "Homepage upserted successfully",
      homepage
    });
  } catch (error) {
    res.status(500).json({ message: "Homepage upsert failed" });
  }
};
