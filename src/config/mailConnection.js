// Import the Nodemailer library
const nodemailer = require("nodemailer");

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "riyalinearloop@gmail.com",
    pass: "kghf wkln eyqh dgqt",
  },
});

// Configure the mailoptions object
const mailOptions = {
  from: "developer@email.com",
  to: "riyalinearloop@gmail.com",
  subject: "Status Changed to Published",
  html: "<h2>Blog Status Updated</h2><p>The status of your blog has been updated to published</p>",
};

// Send the email
const sendMail = () => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error: ", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;
