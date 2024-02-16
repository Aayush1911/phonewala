const express=require('express');
const connectToMongo = require('./db');
const app=express();
app.use(express.json())
const port=4000;
connectToMongo()
app.listen(port,()=>{
    console.log('App listening on port 4000');
})

app.use('/auth',require('./routes/authroute'));
app.use('/mobile',require('./routes/mobileroute'));