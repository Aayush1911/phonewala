const router=require('express').Router()
const cartcontroller=require('../controllers/cartcontroller')
const requireuser = require("../middleware/requireuser");

router.post('/add',requireuser,cartcontroller.addcart)

module.exports=router
