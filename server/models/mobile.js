const mongoose=require('mongoose')
const Schema=mongoose.Schema

const mobileschema=new Schema({
    model_name:{
        type:String,
        requires:true
    },
    company_name:{
        type:String,
        requires:true
    },
    description:{
        type:String,
        requires:true
    },
    price:{
        type:Number,
        requires:true
    },image:{
        type:String,
        requires:true
    }
})

const mobile=mongoose.model('mobile',mobileschema)
module.exports=mobile;