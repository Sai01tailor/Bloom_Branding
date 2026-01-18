const express=require('express');
const router=express.Router();
const enquiryController=require('../controllers/enquiry.controller');
const authMiddleware = require("../middleware/auth.middleware");

router.post('/',enquiryController.createEnquiry);

// Get all enquiries (admin / CMS)
router.get('/admin',authMiddleware,enquiryController.getAllEnquiries);

// Delete enquiry (admin)
router.delete('/admin/:id',authMiddleware,enquiryController.deleteEnquiry);

module.exports=router;
