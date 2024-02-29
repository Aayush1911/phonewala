const cart=require('../models/cart');
const mobile=require('../models/mobile');

const getallcartcontroller=async (req,res)=>{
    try{
        // console.log("User ID:", req.user.id);
        const allCart = await cart.find({ user: req.user.id });
        // console.log("Cart items:", allCart);
        // console.log(allCart.price);
        return res.json(allCart);
    }catch(err){
        console.log(err);
    }
}

const addcart = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await mobile.findById(productId);
        const user = req.user.id; // Get the authenticated user ID
        const price=product.price
        if (!product) {
            return res.status(404).send('Product does not exist');
        }
        // console.log(price);        
        let quantity = 1;

        let existingCartItem = await cart.findOne({ productId, user });

        if (existingCartItem) {
            // If cart item already exists, update the quantity
            existingCartItem.quantity += 1;
            await existingCartItem.save();
            return res.json('Cart item quantity updated');
        } else {
            // If cart item does not exist, create a new one
            const newCartItem = new cart({ productId, quantity, user,price });
            await newCartItem.save();
            return res.json('New item added to the cart');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' });
    }
}

const subcart = async (req, res) => {
    try {
        const productId = req.params.id;
        let product = await cart.findById(req.params.id);

        if (!product) {
            return res.send('Product does not exist');
        }

        let quantity = product.quantity - 1;
        if (quantity <= 0) {
            await cart.findByIdAndDelete(productId);
            return res.send('Product quantity is zero, so deleted');
        }

        await cart.findByIdAndUpdate(productId, { quantity: quantity }, { new: true });
       return res.json({ message: 'Subtracted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
const updatecontroller=async(req,res)=>{
    const quantity=req.body
    let find_cart=await cart.findById(req.params.id)
    if(!find_cart){
        return res.send('Cart does not exist')
    }
    const cartUserId = find_cart.user.toString();
    const reqUserId = req.user.id.toString();

    if (cartUserId !== reqUserId) {
        return res.status(401).json({ message: 'Unauthorized' });
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
        // console.log(deletecart);
        if(!deletecart){
            return res.send('Product in cart does not exist')
        }
        const cartUserId = deletecart.user.toString();
        const reqUserId = req.user.id.toString();
        // console.log(cartUserId);
        // console.log(reqUserId);
        if (cartUserId !== reqUserId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        deletecart=await cart.findByIdAndDelete(req.params.id)
        return res.send('deleted');
    }catch(err){
        console.log(err);
    }
}
const cartitems=async (req,res)=>{
    try {
        // Find cart items for the authenticated user
        const cartItems = await cart.find({ user: req.user.id });
        // Respond with the number of items in the cart
        return res.json(cartItems.length);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Server Error' });
      }
}
module.exports={
    addcart,deletecontroller,updatecontroller,getallcartcontroller,subcart,cartitems
}