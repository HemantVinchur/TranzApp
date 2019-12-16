const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let freightSchema=new Schema({
    grNum:Number,
    freight:Number,
    labour:Number,
    cartage:Number,
    billTCharge:Number,
    doorDeliveryCharge:Number,
    previousFreight:Number,
    totalFreight:Number
})


module.exports=mongoose.model('freight',freightSchema);