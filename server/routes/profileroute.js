const router=require('express').Router();
const profilecontroller=require('../controllers/profilecontroller')
const requireuser=require('../middleware/requireuser')

router.post('/add',requireuser,profilecontroller.addcontroller)

module.exports=router