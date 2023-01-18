const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserModel}=require('../model/UserModel');

const User = express.Router();

//normal user for signup method ......
User.post('/signup',async(req,res)=>{
    try{
        const {email,password,name} = req.body;
        const user =await  UserModel.findOne({email});
        console.log(user)
        if(user){
            return res.send({"message":"Allready have an Account please login"})
        }
        bcrypt.hash(password, 5, async function(err, hash) {
            // Store hash in your password DB.
        const userdata = new UserModel({name,email,password:hash});
        await userdata.save();
        return res.send({"message":"signup succesfully"})
        });
        
        
    }catch(err){
        console.log("err from user router signup method");
        console.log(err);
    }

   
})


//normal user for login method........

User.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user = await UserModel.findOne({email});
    if(!user){
        return res.send({"message":"You don't have account first signup"});
    }
    const hashPassword= user.password;
    bcrypt.compare(password, hashPassword, function(err, result) {
        // result == true;
        if(!result) return res.send({"message":"wrong Password"})

        const token = jwt.sign({"userID" :user._id},'hussh');
        console.log(token)
        res.send({"message":"login successfully", token})
        
    });
    
})

module.exports={User};
