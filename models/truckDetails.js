const mongoose=require('mongoose');
const Schema=mongoose.Schema;


let truckDetailsSchema=new Schema({
    grNum:Number,
    challanNumber: Number,
    from:String,
    to:String,
    date:String,
    truckNumber:String,
    driverName:String,
    ownerName:String,
    engineNumber:String,
    chechiseNumber:String

});

module.exports=mongoose.model('truckDetails',truckDetailsSchema);