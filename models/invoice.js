const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let invoiceSchema = new Schema({
   grNum: Number,
   invoiceNumber: Number,
   invoiceValue: Number,
   date:{type:Date,default:Date.now()},
   challanNumber: Number,
   challanDate: Date,
   deliveryOffice: String,
   deliveryName: String,
   // previousFreight:Number,
   // total:Number
})


module.exports = mongoose.model('invoice', invoiceSchema);