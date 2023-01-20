const express = require('express');


const home = express.Router();
const {DataModel}=require('../model/data.Model');

home.get('/',async(req,res)=>{
    try{
        const data = await DataModel.find();
        console.log(data);
        res.send(data)
    }catch(err){
        console.log("err from base route");
        console.log(err);
        res.send({"messae":"something went wrong"});
        
    }
})

home.get('/search',async(req,res)=>{
    try{
        const query = req.query.q;
        const q = query.toLocaleLowerCase();
       const data =await DataModel.find({title:{$regex: new RegExp(q)}})
   
      res.status(200).json({
        data,
        message:"succesfull"
      })
    }catch(err){
        console.log("err");
        console.log(err);
    }
    
})

module.exports={home};