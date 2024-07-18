import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login User

const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User does not exist"})

        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({sucess:false,message:"Invalid Credentials"})

        }
        const token = createToken(user._id);
        res.json({success:true,token})

    }
    catch(error){
        console.log(error);
        return res.json({sucess:false,message:"Error"})

    }

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user

const  registerUser = async (req,res)=>{
    const {name,password,email} = req.body;
    try{
        //check if email is already in use or not
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User Already Exists with this email!"})
        }
        //valiudating email format and stong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid email!"})

        }
        if(password.length<8){
            return res.json({success:false, message:"Enter a strong password!"})
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        // creating new user with hashed password and email
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token})



    }

    catch(error){
        console.log(error);
        res.json({sucess:false,message:"Error"})

    }

}

export {loginUser,registerUser}