const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const mobile=require('./mobile')

const cartschema=new Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'mobile'
    },
    quantity:{
        type:Number
    },user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    price:{
        type:Number
    }
})
const cart=mongoose.model('cart',cartschema)
module.exports=cart
