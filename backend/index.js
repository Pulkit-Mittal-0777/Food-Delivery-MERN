const express=require('express');
const mongoDb=require('./db');
const cors=require('cors');

const app=express();
const User=require('./Models/User')
const Order=require('./Models/Order')
const createuser=require('./Routes/create_user');
const displaydata=require('./Routes/display_data');
const orderdata=require('./Routes/order_data');

app.use(cors({
    origin:['http://localhost:3000']
}))

mongoDb()

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(createuser);
app.use(displaydata);
app.use(orderdata);
app.listen(4000,()=>{
    console.log('server started at port 4000');

  
})