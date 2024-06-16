const express=require('express');
const router=express.Router();

router.post('/fooddata',async(req,res)=>{
    try{
        res.send([global.food_items,global.foodCategory]);
        
        // console.log(global.food_items);
    }
    catch(err){
        console.log("fvvfgbfgbfgbf");
    }
})

module.exports=router;