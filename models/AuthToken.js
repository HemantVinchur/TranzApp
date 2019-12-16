const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let authSchema = new Schema({

    emailId: String,
    accessToken: String
});

module.exports = mongoose.model('AuthToken', authSchema);