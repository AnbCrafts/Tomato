import mongoose from "mongoose";



const foodScema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})
const foodModel = mongoose.models.food || mongoose.model("food",foodScema);
// first one will check if the model is already there or not and second one will create a new model , this is done to presvent the formation of new schema in every run


export default foodModel;