const router=require('express').Router()
const cartcontroller=require('../controllers/cartcontroller')
const requireuser = require("../middleware/requireuser");

router.post('/add/:id',requireuser,cartcontroller.addcart)
router.post('/sub/:id',requireuser,cartcontroller.subcart)
router.delete('/delete/:id',requireuser,cartcontroller.deletecontroller)
router.post('/update/:id',requireuser,cartcontroller.updatecontroller)
router.get('/all',requireuser,cartcontroller.getallcartcontroller)
router.get('/items',requireuser,cartcontroller.cartitems)

module.exports=router
