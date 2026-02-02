import mongoose from "mongoose";

export const connectMongo = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: "memorymap",
        });
        console.log("MongoDB connected successfully...");
    }catch(err){
        console.log("MongoDB Error: ",err);
    }
};