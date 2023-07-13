const mongoose = require('mongoose');


const CartSchema =  mongoose.Schema({
    title:{type:String,required:true},
    Rating:{type:String,required:true},
    Price:{type:String,required:true},
    author:{type:String,required:true},
    image:{type:String},
    userId:{type:String,required:true}
});

const CartModel =   mongoose.model("CartItem",CartSchema);


module.exports={CartModel};