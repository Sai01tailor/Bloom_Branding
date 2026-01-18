const jwt=require("jsonwebtoken");
const adminModel=require("../models/admin.model");


const authMiddleware=async(req,res,next)=>{
    try{    
        const authHeader=req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({success:false,message:"no token provided"});
        }
        const token=authHeader.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const admin=await adminModel.findById(decoded.id).select("-password");
        if(!admin){
            return res.status(401).json({success:false,message:"admin not found"});
        }

        req.admin=admin;
        next();

        
    }catch(err){
        res.status(401).json({success:false,message:"invalid token"});
    }
};

module.exports=authMiddleware;