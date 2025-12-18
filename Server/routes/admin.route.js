console.log(" admin routes loaded");


const express=require("express");
const router=express.Router();
const adminController=require("../controllers/admin.controller");


router.post('/register',adminController.createAdmin);
router.post('/login',adminController.loginAdmin);


module.exports=router;
