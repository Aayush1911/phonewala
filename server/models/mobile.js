const mongoose=require('mongoose')
const Schema=mongoose.Schema

const mobileschema=new Schema({
    model_name:{
        type:String,
        required: true
    },
    company_name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },image:{
        type:String,
        required: true
    }
})

const mobile=mongoose.model('mobile',mobileschema)
module.exports=mobile;