const cart=require('../models/cart');
const mobile=require('../models/mobile');
const getallcartcontroller=async (req,res)=>{
    try{
        const allcart=await cart.find()
        return res.json(allcart)
    }catch(err){
        console.log(err);
    }
}
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
            cartitem.quantity=parsedQuantity
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
const updatecontroller=async(req,res)=>{
    const quantity=req.body
    let find_cart=await cart.findById(req.params.id)
    if(!find_cart){
        return res.send('Cart does not exist')
    }
    let update_quantity=quantity
    find_cart=await cart.findByIdAndUpdate(
        req.params.id,
        {$set:update_quantity},
        {new:true}
    )
    res.json(find_cart)
}
const deletecontroller=async(req,res)=>{
    try{    
        let deletecart=await cart.findById(req.params.id)
        if(!deletecart){
            return res.send('Product in cart does not exist')
        }
        deletecart=await cart.findByIdAndDelete(req.params.id)
        return res.send('Deleted')
    }catch(err){
        console.log(err);
    }
}
module.exports={
    addcart,deletecontroller,updatecontroller,getallcartcontroller
}