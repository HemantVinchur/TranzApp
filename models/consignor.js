const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let consignorSchema=new Schema({
    grNum:Number,
    consignorCode:Number,
    consignorName:String,
    from:String,
    consignorGst:String,
    consignorPhone:String
})


module.exports=mongoose.model('consignor',consignorSchema);