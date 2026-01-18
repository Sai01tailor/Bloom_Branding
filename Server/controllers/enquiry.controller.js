const Enquiry= require('../models/enquiry.model');
const sendEmail=require('../utils/sendEmail');

exports.createEnquiry=async(req,res)=>{
    try{
        const enquiry=await Enquiry.create(req.body);

        // sending confirmation mail to client
        await sendEmail({
            to:enquiry.email,
            subject:'We’ve received your enquiry – Bloom Branding',
            text: `Hi ${enquiry.name},\n\nThanks for reaching out to Bloom Branding. Our team has received your enquiry and will get back to you shortly.\n\n– Bloom Branding Team`
        });

         // notify admin
       await sendEmail({
  to: process.env.ADMIN_EMAIL,
  subject: 'New Brand Enquiry – Bloom Branding',
  html: `
    <div style="
      max-width: 600px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      padding: 20px;
    ">

      <div style="
        background-color: #ffffff;
        border-radius: 8px;
        padding: 24px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      ">

        <h2 style="margin-top: 0; color: #222;">
          New Brand Enquiry
        </h2>

        <p style="color: #555; font-size: 14px;">
          A new enquiry has been submitted via the Bloom Branding website.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

        <p><strong>Name:</strong> ${enquiry.name}</p>
        <p><strong>Email:</strong> ${enquiry.email}</p>
        <p><strong>Company:</strong> ${enquiry.company || '-'}</p>
        <p><strong>Service:</strong> ${enquiry.service || '-'}</p>
        <p><strong>Contact Number:</strong> ${enquiry.contactNo || '-'}</p>
        <p><strong>Budget:</strong> ${enquiry.budget || '-'}</p>
        <p><strong>Timeline:</strong> ${enquiry.timeline || '-'}</p>
        <p><strong>Social Handle(if any):</strong> ${enquiry.clientSocialHandle || '-'}</p>
        <p><strong>Website(If any )</strong> ${enquiry. clientWebsite|| '-'}</p>
        <p><strong>Query(If any )</strong> ${enquiry.clientQuery|| '-'}</p>


        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

        <p><strong>Description:</strong></p>
        <p style="color: #444; line-height: 1.6;">
          ${enquiry.clientDesc || '-'}
        </p>

      </div>

      <p style="
        text-align: center;
        font-size: 12px;
        color: #999;
        margin-top: 16px;
      ">
        Bloom Branding • New Enquiry Notification
      </p>

    </div>
  `
});



        res.status(201).json({
            success:true,
            message:'Enquiry submitted successfully'
        })

    }
    catch(err){
        res.status(500).json({success: false, message: err.message,msg:'i did it' })
    }
};

// GET all enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      success: true,
      data: enquiries
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// hi 