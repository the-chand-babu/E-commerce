const jwt = require('jsonwebtoken')

const {AdminModel}=require('../model/AdminModel');

const Adminauth=(async(req,res,next)=>{
    try{
        const authorization = req.headers.authorization;
        const token = authorization?.split(' ')[1];
        var decoded = jwt.verify(token, 'hussh');
        if(!decoded){
            return res.send({"messgae":"something went wrong"});
        }
        const _id = decoded.userID;
        
        const admin = await AdminModel.findById({_id});
        if(!admin){
            res.send({"message":"not authorised"})
        }
        next();
    }catch(err){
        console.log(err);
        res.send({'message':"somethin went wrong"});
    }
})




//checking for user authentication user is login or not...

const UserAuth =(async(req,res,next)=>{
try{
    const authorization=req.headers.authorization;
    const token = authorization?.split(' ')[1];
    var decoded = jwt.verify(token, 'hussh');
    if(!decoded) return res.send({"message":"user not valid"});
    const _id = decoded.userID;
    req.body.userId= _id;
    next();
}catch(err){
    console.log("err from usr authenctionation");
    console.log(err);
    return res.send({"message":"something went wrong"});
}



})
module.exports={Adminauth,UserAuth}