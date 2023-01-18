const mongoose = require('mongoose');



const DataSchema=mongoose.Schema({
    title:{type:String,required:true},
    Rating:{type:String,required:true},
    Price:{type:String,required:true},
    author:{type:String,required:true},
    image:{type:String,required:true},
})




const DataModel = mongoose.model("Data",DataSchema)

module.exports={DataModel};