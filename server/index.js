const express=require('express');
const connectToMongo = require('./db');
const app=express();
app.use(express.json())
var cors = require('cors')

const port=4000;
connectToMongo()
app.listen(port,()=>{
    console.log('App listening on port 4000');
})
app.use(cors({
    orgin:["http://localhost:5173/"],
    methods:["POST","GET"],
    credentials:true
  }))
app.use('/auth',require('./routes/authroute'));
app.use('/mobile',require('./routes/mobileroute'));
app.use('/cart',require('./routes/cartroute'))
app.use('/profile',require('./routes/profileroute'))