const express = require('express');


const {connetion}= require('./db');
const {User}=require('.//Router/user.Router');
const {Admin}=require('./Router/Admin.Router')
const {Data}=require('./Router/Data.router')
const app= express();
app.use(express.json());
app.use('/user',User);
app.use('/admin',Admin);

app.use('/admin/upload',Data);
app.use('/admin/data',Data);
app.use('/admin/update',Data);
app.use('/admin/delete',Data);














app.listen (3240,async(err)=>{
    try{
        await connetion;
        console.log("port is litning 3240")
    }
   catch(err){
    console.log("err from db connection");
    console.log(err);
   }
})









