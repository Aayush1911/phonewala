const User = require("../models/user");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const {sendmail}=require('../helper/mailer/signupMail')
const {otp}=require('../helper/mailer/signupMail')
dotenv.config({ path: './.env' });
const session = require('express-session');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.OTP_ENCRYPT_DECRYPT_KEY);


const signupcontroller = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const { otp } = await sendmail(email);
        // console.log('OTP:', otp);
        const encryptedotp = cryptr.encrypt(otp);
        res.cookie('otp', encryptedotp, {
            httpOnly: true,
            secure: true,
            maxAge: 5 * 60 * 1000,
        });
        req.session.signupData = { name, email, password };
        res.status(200).json({ message: 'OTP sent successfully', encryptedotp });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
}
const otpverifier=async(req,res)=>{
    try {
        const { otp } = req.body;
        const expectedOTP = req.cookies.otp;
        // console.log(expectedOTP);
        if (!expectedOTP) {
            return res.status(400).json({ error: 'OTP not found in cookies' });
        }
        const decryptedotp = cryptr.decrypt(expectedOTP);
        if (otp !== decryptedotp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        res.clearCookie('otp');
        const { name, email, password } = req.session.signupData || {};
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Signup data incomplete or not found in session' });
        } 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const data = { user: { id: user.id } };
        const authtoken = jwt.sign(data, process.env.AUTH_TOKEN);

        res.status(200).json({ message: 'Signup successful' ,authtoken});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }

}
const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User does not exist, please sign up first' });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: 'Incorrect password' });
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, process.env.AUTH_TOKEN);
        res.json({ authtoken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
}

module.exports = {
    signupcontroller,
    logincontroller,
    otpverifier
}
