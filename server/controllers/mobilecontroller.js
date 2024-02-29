const mobile = require("../models/mobile");
// const mobile = require("../models/mobile");

const addcontroller=async(req,res)=>{
    try{
        const {model_name,company_name,description,price,image}=req.body;
        const mob=await mobile.create({
            model_name,company_name,description,price,image
        })
        res.send("Added")
    }catch(err){
        console.log(err);
    }
}
const getallcontroller=async(req,res)=>{
    try{
        const allmobile=await mobile.find()
        return res.json(allmobile)
    }catch(err){
        console.log(err);
    }
}
const getbycompanycontroller=async(req,res)=>{
    try{
    const company=req.params.category
    let mobile_find=await mobile.find({company_name:company})
    return res.json(mobile_find)
    }catch(err){
        console.log(err);
}
}
const getbyidcontroller=async(req,res)=>{
    try{
        let mob=await mobile.findById(req.params.id)
        if(!mob){
            return res.status(404).json({ error: 'Mobile not found' });
        }
        return res.json(mob)
    }catch(err){
        console.log(err);
    }
}
const updatecontroller=async(req,res)=>{
    const {model_name,company_name,description,price,image}=req.body;
    let newmobile={}
    if(model_name){
        newmobile.model_name=model_name
    }
    if(company_name){
        newmobile.company_name=company_name
    }
    if(description){
        newmobile.description=description
    }
    if(price){
        newmobile.price=price;
    }
    if(image){
        newmobile.image=image
    }
    let mob=await mobile.findById(req.params.id);
    if(!mob){
        return res.send("NOt found")
    }
    mob=await mobile.findByIdAndUpdate(
        req.params.id,
        {$set:newmobile},
        {new :true}
    )
    res.json(mob)
}
const deletecontroller=async(req,res)=>{
   try{
    let mob=await mobile.findById(req.params.id);
    // console.log(mob);
    if(!mob){
        return res.send('Mobile not found')
    }
    mob=await mobile.findByIdAndDelete(req.params.id);
   return  res.json("Mobile has been deleted")
   }
   catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
   }
}
module.exports={
    addcontroller,getallcontroller,getbyidcontroller,updatecontroller,deletecontroller,getbycompanycontroller
}