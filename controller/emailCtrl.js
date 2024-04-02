const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MP,
        },
        debug: true, // Enable debug output
        logger: true // Log output to console
    });
      
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Hey 👻" <abc@gmail.com>', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.html, // html body
    });

    console.log("Message sent: %s", info.messageId);
});

module.exports = sendEmail;
