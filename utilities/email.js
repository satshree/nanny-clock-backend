const nodemailer = require("nodemailer");
const { EmailNotSetup } = require("../middlewares/exception");

function getTransporter() {
  if (
    process.env.EMAIL_SENDER === undefined &&
    process.env.EMAIL_APP_PASSWORD === undefined
  ) {
    throw new EmailNotSetup();
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  return transporter;
}

async function sendMailAsHTML(to, subject, body) {
  const transporter = getTransporter();

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to,
    subject,
    html: body,
  };

  await transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(
        `ERROR FROM SEND MAIL => ${JSON.stringify(err, undefined, 2)}`
      );
    else
      console.log(
        // `LOG FROM SEND MAIL => ${JSON.stringify(info, undefined, 2)}`
        "Email Sent"
      );
  });
}

module.exports = { sendMailAsHTML };
