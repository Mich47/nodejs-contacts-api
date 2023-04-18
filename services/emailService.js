const { getVerificationUrl, getVerificationEmail } = require("../helpers");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const { convert } = require("html-to-text");
require("dotenv").config();

const sendVerificationEmail = async ({ email, verificationToken }) => {
  const verificationURL = getVerificationUrl(verificationToken);

  const html = getVerificationEmail(email, verificationURL);

  const { NODE_ENV, MAILTRAP_USER, MAILTRAP_PASSWORD, SENDGRID_API_KEY } =
    process.env;

  const msg = {
    to: email,
    from: "test@example.com",
    subject: "User verification",
    text: convert(html),
    html,
  };

  if (NODE_ENV === "development") {
    // Nodemailer Mailtrap
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: MAILTRAP_USER,
        pass: MAILTRAP_PASSWORD,
      },
    });

    try {
      await transport.sendMail(msg);
    } catch (error) {
      console.error(error);
    }
  } else {
    // SendGrid
    sgMail.setApiKey(SENDGRID_API_KEY);

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  }

  const message = "Verification email sent";

  return message;
};

module.exports = { sendVerificationEmail };
