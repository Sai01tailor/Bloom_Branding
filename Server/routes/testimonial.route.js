const express=require('express')
const router=express.Router();
const testimonialController = require('../controllers/testimonial.controller');
const authMiddleware = require("../middleware/auth.middleware");
const { upload } = require('../middleware/multer.middleware')

router.get('/',testimonialController.getAllTestimonials)  //will list all testimonial
router.post('/admin', authMiddleware,upload.fields([
    { name: 'clientLogo', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),
testimonialController.createTestimonial
) // create testimonial
router.delete('/admin/:id', authMiddleware, testimonialController.deleteTestimonial); //delete testimonial


module.exports=router;