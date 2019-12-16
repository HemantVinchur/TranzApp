const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let grPageSchema = new Schema({
    grNum: Number,
    bookedAt: String,
    payType: String,
    vehicleNum: String,
   // privateMark: String
});

module.exports = mongoose.model('grPage', grPageSchema);