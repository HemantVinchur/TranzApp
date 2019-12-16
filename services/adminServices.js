const adminModel = require('../models/adminModel');
const authToken = require('../models/AuthToken');
const verifyOTP = require('../models/VerifyOTP');
const functions = require('../function');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');


const registerService = async (payload) => {

    try {
        let findData = await adminModel.findOne({ emailId: payload.emailId });
        if (findData) {
            throw new Error("user already exist");
        }

        let hashObj = functions.hashPassword(payload.password)
        console.log(hashObj)
        delete payload.password

        payload.salt = hashObj.salt;
        payload.password = hashObj.hash;

        let createData = await adminModel.create(payload);
        return createData;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

const loginService = async (req, res) => {
    try {
        let payload = req.body;
        console.log(payload)
        let findData = await adminModel.findOne({ emailId: payload.emailId });
        if (!findData) {
            throw new Error("user not exist");
        }

        let isPasswordValid = functions.validatePassword(findData.salt, payload.password, findData.password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            throw new Error("invalid email and password");
        }

        if (req.headers.authorization) {
            throw new Error("Access Token found");
        }

        delete req.headers.authorization;

        let token = jwt.sign({ emailId: payload.emailId }, 's3cr3t');
        console.log(token);
        let createData = await authToken.create({ emailId: payload.emailId, accessToken: token });

        return res.status(200).json({
            statusCode: 200,
            message: "sucess",
            data: { findData, createData }
        })

    } catch (error) {
        console.log(error);
        res.status(200).json({
            statusCode: 400,
            message: "somthing went wrong",
            data: {}
        })
    }
}

//login through access token:-

const loginTokenService = async (token) => {
    try {
        let decodedData = await functions.authenticate(token);
        console.log(decodedData)
        if (!decodedData) {
            return res.status(200).json({
                statusCode: 400,
                message: "somthing went wrong1",
                data: {}
            })
        }
        return

    } catch (error) {
        console.error(error);
        throw error;
    }
}


//logout

const logoutServices = async (token) => {
    try {
        let decodeData = await functions.authenticate(token);
        console.log(decodeData)
        if (!decodeData) {
            throw new Error("somthing went wrong1");
        }

        token.accessToken = decodeData.accessToken;

        let dataDelete = await authToken.deleteOne(token.accessToken);

        return dataDelete

    } catch (error) {
        /*res.status(200).json({
            statusCode: 400,
            message: "somthing went wrong",
            data: {}
        })*/
        console.error(error)
        throw error;
    }
}

//forgot password

const forgotPassServices = async (payload) => {
    try {
        let findData = await adminModel.findOne({ emailId: payload.emailId });
        if (!findData) {
            throw new Error("emailId is not exist");
        }

        tokenDemo = Math.floor(1000 + Math.random() * 9000);
        console.log(tokenDemo)
        let tokenData = await verifyOTP.create({ otp: tokenDemo, emailId: payload.emailId })

        const transporter = nodemailer.createTransport({

            service: 'gmail',
            auth:
            {
                user: 'venus.bityotta@gmail.com',
                pass: 'venus@123'
            }
        });
        const mailOptions =
        {
            from: 'venus.bityotta@gmail.com',
            to: payload.emailId,
            subject: 'Account Verification Token',
            text: 'Hello,\n\n' + 'Your otp is ' + tokenDemo
        };

        let sendMail = await transporter.sendMail(mailOptions);

        return findData, tokenData, sendMail;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//verifyOTP

const verifyOTPServices = async (payload) => {
    try {
        let findData = await verifyOTP.findOne({ otp: payload.otp });
        console.log(findData)
        if (!findData) {
            throw new Error("otp is not correct");
        }
        return findData
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//reset password
const resetPassServices = async (payload) => {
    try {

    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { registerService, loginService, loginTokenService, logoutServices, forgotPassServices, verifyOTPServices, resetPassServices };