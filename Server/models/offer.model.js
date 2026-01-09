const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },

    shortDescription:{
        type:String,
        required:true,
       
    },

    longDescription:{
        type:String,
    
    },
    icon:{
        type:String,
    },

    order:{
        type:Number,
        default:0
    },

    isActive: {
  type: Boolean,
  default: true
},

    
   
}, {
    timestamps: true
})

module.exports = mongoose.model('Offer', offerSchema);
