const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//autoIncrement = require('mongoose-auto-increment');
//const AutoIncrement = require('mongoose-sequence')(mongoose);

let CustomerSchema = new Schema({
    name: String,
    customerCode:{type:String},
    address: String,
    emailId: String,
    countryCode: Number,
    phoneNo: String,
    gstIn: String,
    latitude: String,
    longitude: String,
    isConsignor:{type:Boolean,default:false},
    isDelete:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()}
});



module.exports = mongoose.model('Customer', CustomerSchema);