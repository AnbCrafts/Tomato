import mongoose from "mongoose";

export const connectDB = async ()=>{
    await  mongoose.connect('mongodb+srv://Anubhaw:anb%4022052003@cluster0.nle92li.mongodb.net/food-website').then(()=>{
        console.log("DB Connected Successfully!!");
    })
}