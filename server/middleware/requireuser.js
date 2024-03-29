const jwt=require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const fetchuser=(req,res,next)=>{
    //get user from the jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using valid token"})
    }
    try {
        const JWT_SECRET=process.env.AUTH_TOKEN
        const data=jwt.verify(token,JWT_SECRET)
        // console.log(data);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using valid token"})
    }
    
}
module.exports=fetchuser;