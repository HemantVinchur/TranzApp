const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let registerSchema = new Schema({

    emailId: String,
    password: String,
    firstName: String,
    lastName: String,
    countryCode: Number,
    contactNo: String,
    enterpriseName: String,
    address: String,
    latitude: String,
    longitude: String,
    deviceToken: String,
    deviceType: String,
    salt: String,
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() }

})

module.exports = mongoose.model('adminModel', registerSchema);