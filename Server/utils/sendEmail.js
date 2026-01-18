const SibApiV3Sdk = require("sib-api-v3-sdk");

// Initialize client
const client = SibApiV3Sdk.ApiClient.instance;

// IMPORTANT: correct auth key
client.authentications["api-Key"].apiKey = process.env.BREVO_API_KEY;

// Create API instance
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const emailData = {
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: "Bloom Branding",
      },
      to: [{ email: to }],
      subject,
      textContent: text || "New enquiry received",
      htmlContent: html || `<p>${text || "New enquiry received"}</p>`,
    };

    const response = await emailApi.sendTransacEmail(emailData);
    return response;
  } catch (err) {
    console.error(
      "Brevo Email Error:",
      err.response?.body || err.message
    );
    throw err;
  }
};

module.exports = sendEmail;
