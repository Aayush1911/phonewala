const router=require('express').Router()
const cartcontroller=require('../controllers/cartcontroller')
const requireuser = require("../middleware/requireuser");

router.post('/add',requireuser,cartcontroller.addcart)
router.delete('/delete/:id',requireuser,cartcontroller.deletecontroller)
router.post('/update/:id',requireuser,cartcontroller.updatecontroller)

module.exports=router
