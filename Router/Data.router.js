const express = require('express');
const cloudinary = require('cloudinary').v2
const fileUpload=require("express-fileupload")

//creating a router.....
const Data = express.Router();
const {DataModel}=require('../model/data.Model')
const {Adminauth}=require('../authenticate/auth')

//using fileupload middleware.....
Data.use(fileUpload({
    useTempFiles:true,
    limits: { fileSize: 50 * 1024 * 1024 },
  }));
  
  // using cloudnary config....
  
  cloudinary.config({ 
    cloud_name: 'dvcp7rsqb', 
    api_key: '798355923177816', 
    api_secret: 'HuZu3xDOL5pHqplNQzLFl8uk9XY' 
  });


  /// to upload data on the database...

Data.post('/',Adminauth,async(req,res)=>{
    try{
        const file = req.files.image;
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
        public_id:`${Date.now()}`,
        resource_type:"auto",
        folder:"image"
    })
    const image =result.url;
    const {title,Price,Rating,author} = req.body;
    const data = new DataModel({title,Price,Rating,author,image});
    await data.save();
    res.send({"mesaage":"uploaded succsefully"})
    }
    catch(err){
        console.log(err);
        res.send({"mesaage": "something wwnt wront"})
    }

      
   
})

/// to get the data from the database...

Data.get('/',Adminauth,async(req,res)=>{
    try{
        const data =await DataModel.find();
        res.send(data);
    }catch(err){
        console.log('err from Data router get router');
        console.log(err);
        res.send({"message":"something went wrong"});
    }
})

//to update data in database...

Data.patch('/:noteId',Adminauth,async(req,res)=>{
    try{
        const _id=req.params.noteId;
        
        const file = req.files.image;
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            public_id:`${Date.now()}`,
            resource_type:"auto",
            folder:"image",
        })
        const image = result.url;
        const {title,Rating,Price,author}=req.body;
        const updatedata = await DataModel.findByIdAndUpdate({_id},{title,Rating,author,Price,image});
        if(!updatedata){
            return res.send({"message":"wrong id"});
        };
        return res.send("done")
    }catch(err){
        console.log(err);
        res.send({"messae":"something went wrong"});
    }
})

///delete data from the database

Data.delete('/:_id',Adminauth,async(req,res)=>{
    const{_id}=req.params;
    const data =await DataModel.findByIdAndDelete({_id});
    if(!data) return res.send({"message":"dos'nt match id"});  
    return res.send({"message":"deleted succesfully"});
})

module.exports={Data};