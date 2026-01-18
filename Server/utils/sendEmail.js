const axios = require("axios");

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: process.env.BREVO_SENDER_EMAIL,
          name: "Bloom Branding",
        },
        to: [{ email: to }],
        subject,
        textContent: text || "New enquiry received",
        htmlContent: html || `<p>${text || "New enquiry received"}</p>`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error(
      "Brevo API Error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

module.exports = sendEmail;
