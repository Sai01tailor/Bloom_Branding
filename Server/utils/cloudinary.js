const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config();


// console.log('ENV CHECK 👉', {
//   cloud: process.env.CLOUDINARY_CLOUD_NAME,
//   key: process.env.CLOUDINARY_API_KEY,
//   secret: process.env.CLOUDINARY_API_SECRET
// })

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type:"auto",
    });
    // file has been uploaded succesfully
    console.log("File Is Uploaded on Cloudinary", response.url);

 //  DELETE local file AFTER success
    fs.unlinkSync(localFilePath)
    return response;
  } catch (err) {
    console.error("❌ CLOUDINARY ERROR:", err);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    throw err; 
  }
};


// NOTE:Currently uploadResumeOnCloudinary is unused 
const uploadResumeOnCloudinary = async (localFilePath, originalName) => {
  try {
    const fileName = path.parse(originalName).name; // without .pdf

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",
      folder: "job-resumes",
      public_id: fileName,              
      use_filename: true,
      unique_filename: true,
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (err) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw err;
  }
};


const deleteFromCloudinary=async(publicId)=>{
    try{
        await cloudinary.uploader.destroy(publicId)
    }
    catch(err){
        console.error('cloudinary Delete Failed',err)
    }
}


module.exports = { uploadOnCloudinary, deleteFromCloudinary ,uploadResumeOnCloudinary };
