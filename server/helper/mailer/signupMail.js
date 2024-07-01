const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator');

function sendmail(email) {
    return new Promise((resolve, reject) => {
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'aayushpatelwebdev@gmail.com',
                pass: 'ulpvpcdsjvcguikq',
            },
        });

        const mailOptions = {
            from: 'aayushpatelwebdev@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP code is ${otp}`,
            html: `<b>Your OTP code is ${otp}</b>`,
        };

        // console.log('Sending mail with options:', mailOptions);

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                reject(error); // Reject the promise if there's an error
            } else {
                console.log('Email sent: %s', info.messageId);
                resolve({ otp, info }); // Resolve the promise with OTP and email information
            }
        });
    });
}

module.exports = { sendmail };
