const mongoose = require("mongoose");

const homepageSchema = new mongoose.Schema(
  {
    hero: {
      heading: String,
      subHeading: String,
      ctaText: {
        type: String,
        default: "Brand Enquiry"
      }
    },

    story: {
      title: {
        type: String,
        default: "Blooming the Brand"
      },
      description: String
    },

    journey: {
      years: Number,
      clients: Number,
      projects: Number
    },

    instagramUrl: String,

    featuredServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Offer" 
      }
    ],
    
    featuredPortfolio: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio"
      }
    ],

    featuredTestimonials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testimonial"
      }
    ],

    featuredClients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Homepage", homepageSchema);

