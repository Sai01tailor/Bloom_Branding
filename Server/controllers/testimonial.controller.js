const  Testimonial = require('../models/testimonial.model');

// get all testimonials
exports.getAllTestimonials=async(req,res)=>{
    try{
          const testimonials = await Testimonial.find().sort({ createdAt: -1 }).limit(6);

          res.status(200).json({
            success:true,
            data:testimonials
          });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"server Error"
        });
    }
}

// POST create testimonials
exports.createTestimonial=async(req,res)=>{
    try{
        const {name,message,rating,clientLogo,videoUrl}=req.body;

        const testimonial=await Testimonial.create({
            name,
            message,
            rating,
            clientLogo,
            videoUrl
        })

        res.status(201).json({
            success:true,
            data:testimonial
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:'Invalid Data'
        })
    }
}


// DELETE testimonial by ID
exports.deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Testimonial.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Testimonial deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};