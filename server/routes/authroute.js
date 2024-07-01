const router=require('express').Router();
const authcontroller=require('../controllers/authcontroller');

router.post('/signup',authcontroller.signupcontroller)
router.post('/login',authcontroller.logincontroller)
router.post('/verify',authcontroller.otpverifier)

module.exports=router
