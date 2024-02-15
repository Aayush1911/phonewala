const router=require('express').Router();
const authcontroller=require('../controllers/authcontroller')

router.post('/signup',authcontroller.signupcontroller)
router.post('/login',authcontroller.logincontroller)

module.exports=router
