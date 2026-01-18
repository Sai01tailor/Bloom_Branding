const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^[6-9]\d{9}$/, // Indian numbers
    },

    opening: {
      type: String, // selected from dropdown on frontend
      required: true,
    },

    experience: {
      type: String, // "Fresher", "1-3 years", "3-5 years", etc.
      required: true,
    },

    resumeLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
