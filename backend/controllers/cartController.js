import { request } from 'express'
import userModel from '../models/userModel.js'

// add itmes to user cart

const  addToCart = async(req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;

        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to cart"});
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Adding to cart failed!"});
    }


}

// remove itmes from user cart

const removeFromCart = async (req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1;

        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})


    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Removing from cart failed"})


    }

}


// fetch user cart Data
const getCart = async (req, res) => {
    try {
      const userData = await userModel.findById(req.body.userId);
      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
      const cartData = userData.cartData;
      res.json({ success: true, cartData });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };
  

export {addToCart,removeFromCart,getCart} 