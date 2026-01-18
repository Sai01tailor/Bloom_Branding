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

    story: [{
      date:{
        type: String,
        default:new Date().getFullYear()

      },
      title: {
        type: String,
        default: "Blooming the Brand"
      },
      desc: {
        type: String,
        default:'Start journey with us'
      },
      img:{
        type:String,
        default:'https://cdn.naturettl.com/wp-content/uploads/2023/10/20173922/landscape-vs-portrait-orientation-8-534x800.jpg '
      }
    }],

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

