const router=require('express').Router();
const authcontroller=require('../controllers/authcontroller');
const otpMiddleware = require('../middleware/otpMiddleware');

router.post('/signup',authcontroller.signupcontroller)
router.post('/login',authcontroller.logincontroller)
router.post('/verify',authcontroller.otpverifier)

module.exports=router
