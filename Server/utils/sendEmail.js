const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    await emailApi.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: "Bloom Branding",
      },
      to: [{ email: to }],
      subject,
      htmlContent: html || `<p>${text}</p>`,
    });
  } catch (err) {
    console.error("Email sending failed:", err);
    throw err;
  }
};

module.exports = sendEmail;
