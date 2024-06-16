const express=require('express');
const router=express.Router();
const User=require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const jwtsecret="mynameispulkitmittal"


router.post('/createuser',async(req,res)=>{


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
        
    }
    const {name,email,password,location}=req.body;

    const salt=await bcrypt.genSalt(10);
    const secpassword=await bcrypt.hash(password,salt);
    try{
        
        await User.create({name,email,password:secpassword,location})
        res.json({success:true});
    }
    catch(err){
        console.log(err);
        res.json({success:false});
    }
})

router.post('/login',async(req,res)=>{

    try{

        const {email,password}=req.body;
        const user=await User.findOne({email});

        if(!user ){
           return res.status(400).json({error:"Trying logging with valid credentials"})
        }
        const passwordcompare=await bcrypt.compare(password,user.password)
        if(!passwordcompare){
            return res.status(400).json({error:"Trying logging with valid credentials"})    
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,jwtsecret);
        
        return res.json({success:true,authToken:authToken});
    }

    catch(e){
        console.log(e);
    }

})


module.exports=router