import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food item
const  addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
         name:req.body.name,
         description:req.body.description,
         price:req.body.price,
         category:req.body.category,
         image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:'Food Added Successfully!!'})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error Adding Food!!"});

    }
}

// all food list
const listFood = async (req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error Listig food Items!!"});
    }

}

// remove food item

const removeFood = async (req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id)//find itme by id
        fs.unlink(`uploads/${food.image}`,()=>{}) // delete the image of the itme form uploads folder


        await foodModel.findByIdAndDelete(req.body.id); //delete the item formthe list
        res.json({success:true,message:"Food Itme Removed Successfully!!"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error Removing Food Item!!"})

    }

}

export {addFood,listFood,removeFood}