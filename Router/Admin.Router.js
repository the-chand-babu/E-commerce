const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {AdminModel}=require('../model/AdminModel');

const Admin = express.Router();

//normal user for signup method ......
Admin.post('/signup',async(req,res)=>{
    try{
        const {email,password,name} = req.body;
        const admin =await  AdminModel.findOne({email});
        console.log(req.body)
        if(admin){
            return res.send({"message":"Allready have an Account please login"})
        }
        bcrypt.hash(password, 5, async function(err, hash) {
            // Store hash in your password DB.
          
        const admindata = new AdminModel({name,email,password:hash});
        await admindata.save();
        return res.send({"message":"signup succesfully"})
        });
        
        
    }catch(err){
        console.log("err from user router signup method");
        console.log(err);
    }

   
})


//normal user for login method........

Admin.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const admin = await AdminModel.findOne({email});
    if(!admin){
        return res.send({"message":"You don't have account first signup"});
    }
    const hashPassword= admin.password;
    bcrypt.compare(password, hashPassword, function(err, result) {
        // result == true;
        if(!result) return res.send({"message":"wrong Password"})

        const token = jwt.sign({"userID" :admin._id},'hussh');
        
        return res.send({"message":"login successfully", token})
        
    });
    
})

module.exports={Admin};