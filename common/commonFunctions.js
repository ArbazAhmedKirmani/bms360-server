const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  return new Promise(async (resolve, reject) => {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    let mailDetails = {
      from: process.env.EMAIL_ADDRESS,
      to: to,
      subject: subject,
      html: text,
    };
    await mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { sendEmail };
