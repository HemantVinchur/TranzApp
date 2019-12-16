const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let verifySchema=new Schema({
    otp:Number,
    emailId:String,
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() }

});

module.exports=mongoose.model('verifyOTP',verifySchema);