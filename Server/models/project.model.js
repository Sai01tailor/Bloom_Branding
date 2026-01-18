const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer", // services / offers
      required: true,
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    mediaUrl: {
      type: String, // cloudinary secure_url
      required: true,
    },

    mediaPublicId: {
      type: String, // cloudinary public_id
      required: true,
    },

    projectLink: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    clientname:{
        type: String,
        required: true,
        trim: true,
    },

    year:{
        type: String,
        required: true,
        trim: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);