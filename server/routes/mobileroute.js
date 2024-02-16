const router=require('express').Router();
const mobilecontroller=require('../controllers/mobilecontroller');

router.post('/add',mobilecontroller.addcontroller)
router.get('/all',mobilecontroller.getallcontroller)
router.get('/all/:id',mobilecontroller.getbyidcontroller)
router.put('/update/:id',mobilecontroller.updatecontroller)
router.delete('/delete/:id',mobilecontroller.deletecontroller)

module.exports=router