const mongoose =require('mongoose');
const mongoUri="mongodb+srv://gofood:mern123@cluster0.czobeck.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0"
const mongoDb=async ()=>{
    

        try{
            await mongoose.connect(mongoUri);
            console.log("connected");
            const fetched_data=await mongoose.connection.db.collection("food_items");
            const data=await fetched_data.find({}).toArray()

            const foodCategory=await mongoose.connection.db.collection("foodCategory");
            const catData=await foodCategory.find({}).toArray()
            // console.log(data);
            // console.log(catData);
            global.food_items=data /// ye global isliye banaya taki ise hum frotend ko send kr ske
            // console.log(global.food_items);
            global.foodCategory=catData;

        }
        catch(err){
            console.log(err);
        }
    
}

module.exports=mongoDb;

