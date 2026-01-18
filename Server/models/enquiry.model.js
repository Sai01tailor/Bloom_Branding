const mongoose=require('mongoose')

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    service: { type: String },
    clientDesc: { type: String, required: true },
    clientQuery: { type: String },
    clientSocialHandle: { type: String },
    clientWebsite: { type: String },
    contactNo: {
      type: String,
      required: true,
      trim: true,
      match: /^[6-9]\d{9}$/   // Indian mobile numbers
    },
    budget: { type: String },
    timeline: { type: String },
  },
  { timestamps: true }   
);


module.exports=mongoose.model('Enquiry',enquirySchema);