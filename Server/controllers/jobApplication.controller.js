const JobApplication = require("../models/jobApplication.model");
const sendEmail = require("../utils/sendEmail");

/**
 * @desc    Create Job Application
 * @route   POST /api/job-applications
 * @access  Public
 */
exports.createJobApplication = async (req, res) => {
  try {
    const { fullName, email, phone, opening, experience, resumeLink } =
      req.body;

    // 1️⃣ Basic validation
    if (!fullName || !email || !phone || !opening || !experience) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // 2️⃣ Resume validation
    if (!resumeLink) {
  return res.status(400).json({
    success: false,
    message: "Resume Google Drive link is required",
  });
}

if (!resumeLink.includes("drive.google.com")) {
  return res.status(400).json({
    success: false,
    message: "Please provide a valid Google Drive resume link",
  });
}


    // 5️⃣ Save application in DB
    const application = await JobApplication.create({
      fullName,
      email,
      phone,
      opening,
      experience,
      resumeLink,
    });

    // 6️⃣ Email to Job Seeker (Confirmation)
    await sendEmail({
      to: email,
      subject: "Job Application Received – Bloom Branding",
      html: `
        <p>Hi <strong>${fullName}</strong>,</p>
        <p>We have successfully received your application for the role of <strong>${opening}</strong>.</p>
        <p>Our hiring team will review your profile and contact you if shortlisted.</p>
        <br/>
        <p>Regards,<br/>Bloom Branding Hiring Team</p>
      `,
    });

    // 7️⃣ Email to Admin (Resume LINK, not attachment)
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Job Application Received",
      html: `
        <h3>New Job Application</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Opening:</strong> ${opening}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p>
         <strong>Resume (Google Drive):</strong>
<a href="${resumeLink}" target="_blank" rel="noopener noreferrer">
  View Resume
</a>

        </p>
      `,
    });

    // 8️⃣ Final response
    res.status(201).json({
      success: true,
      message: "Job application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("JOB APPLICATION ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while submitting application",
    });
  }
};

/**
 * @desc    Get all job applications (Admin)
 * @route   GET /api/job-applications
 * @access  Admin
 */
exports.getAllJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch job applications",
    });
  }
};

/**
 * @desc    Delete job application
 * @route   DELETE /api/job-applications/:id
 * @access  Admin
 */
exports.deleteJobApplication = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    // 2️⃣ Delete DB record
    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job application deleted successfully",
    });
  } catch (error) {
    console.error("DELETE JOB APPLICATION ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete job application",
    });
  }
};
