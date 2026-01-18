const  Testimonial = require('../models/testimonial.model');
const { uploadOnCloudinary } = require('../utils/cloudinary')
const { deleteFromCloudinary } = require('../utils/cloudinary')

// get all testimonials
exports.getAllTestimonials=async(req,res)=>{
    try{
          const testimonials = await Testimonial.find().sort({rating:-1, createdAt: -1 });

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
exports.createTestimonial = async (req, res) => {
  try {
    const { name, message, rating } = req.body

    let clientLogoData = null
    let videoData = null

    // IMAGE upload
    if (req.files?.clientLogo) {
      const imagePath = req.files.clientLogo[0].path
      const imageUpload = await uploadOnCloudinary(imagePath)

      clientLogoData = {
        url: imageUpload.secure_url,
        public_id: imageUpload.public_id
      }
    }

    // VIDEO upload
    if (req.files?.video) {
      const videoPath = req.files.video[0].path
      const videoUpload = await uploadOnCloudinary(videoPath)

      videoData = {
        url: videoUpload.secure_url,
        public_id: videoUpload.public_id
      }
    }

    const testimonial = await Testimonial.create({
      name,
      message,
      rating,
      clientLogo: clientLogoData,
      video: videoData
    })

    res.status(201).json({
      success: true,
      data: testimonial
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      success: false,
      message: 'Invalid data'
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

         // ✅ Delete image from Cloudinary if exists
    if (deleted.clientLogo?.public_id) {
      await deleteFromCloudinary(deleted.clientLogo.public_id)
    }

    // ✅ Delete video from Cloudinary if exists
    if (deleted.video?.public_id) {
      await deleteFromCloudinary(deleted.video.public_id)
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
