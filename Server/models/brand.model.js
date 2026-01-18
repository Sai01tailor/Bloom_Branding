const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String, // e.g. "december 2025 – Currently Ongoing"
    //   required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    images: [
      {
        url: String,
        public_id: String,
      }
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
