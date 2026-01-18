const mongoose = require("mongoose");

const clientLogoSchema = new mongoose.Schema(
  {
    clientName: {
      type: String, 
      trim: true,
    },

    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClientLogo", clientLogoSchema);
