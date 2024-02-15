const mongoose=require('mongoose');
const Schema=mongoose.Schema

const UserSchema = new Schema({
    name:{
        type:String,
        requires:true
    }, email:{
        type:String,
        requires:true,
        unique:true
    }, password:{
        type:String,
        requires:true
    }
  });
  const user=mongoose.model('user',UserSchema);
  module.exports=user