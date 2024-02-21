const cart=require('../models/cart');
const mobile=require('../models/mobile');

const addcart=async(req,res)=>{
    try{
        const {productId,quantity}=req.body;
        const product =await  mobile.findById(productId)
        const parsedQuantity = parseInt(quantity);
        if(!product){
            return res.send("Product doesn't exixt")
        }
        let cartitem=await cart.findOne({productId:productId})
        if(cartitem){
            cartitem.quantity+=parsedQuantity
        }else{
            cartitem = new cart({ productId, quantity});
        }
        if (cartitem) {
            cartitem = await cartitem.save();
            res.send('Item Added');
        } else {
            res.status(500).send('Failed to add item to cart');
        }
    }catch(err){
        console.log(err);
    }
}
module.exports={
    addcart
}