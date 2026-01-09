const express=require('express')
const router=express.Router();
const testimonialController = require('../controllers/testimonial.controller');

router.get('/',testimonialController.getAllTestimonials)  //will list all testimonial
router.post('/',testimonialController.createTestimonial)  // create testimonial
router.delete('/:id', testimonialController.deleteTestimonial); //delete testimonial


module.exports=router;