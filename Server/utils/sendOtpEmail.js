const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendOtpEmail = async (email, otp) => {
  try {
    await emailApi.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: "Admin Panel",
      },
      to: [{ email }],
      subject: "Admin Signup OTP",
      htmlContent: `
        <h2>Your OTP is ${otp}</h2>
        <p>Valid for <b>2 minutes</b></p>
      `,
    });
  } catch (err) {
    console.error("OTP email failed:", err);
    throw err;
  }
};

module.exports = sendOtpEmail;
