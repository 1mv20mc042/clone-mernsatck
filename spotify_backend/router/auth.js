const express=require("express")
const router=express.Router()
const User=require("../models/User")
const bcrypt=require('bcrypt')
const {getToken}=require("./utils/helpers");


router.post("/register",async(req,res)=>{
const {email,firstName,lastName,username,password}=req.body;

const hashedPassword=bcrypt.hash(password,10);
const user= await User.findOne({email:email});
if(User){
    return res
    .status(403)
    .json({error:'this is already exist'});
}
const newUserData={
    email,password,firstName,lastName,username
}
const newUser=  await User.create(newUserData);

const token =await getToken (email,newUser);

const userToReturn ={...newUser.toJson(),token};
delete userToReturn.password;
return res.status(200).json (userToReturn);
})


module.exports= router;