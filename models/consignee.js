const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let consigneeSchema=new Schema({
    grNum:Number,
    consigneeCode:Number,
    consigneeName:String,
    to:String,
    consigneeGst:String,
    consigneePhone:String
})


module.exports=mongoose.model('consignee',consigneeSchema  );