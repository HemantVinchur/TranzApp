const router = require('express').Router();
const functions = require('../function');
const crypto = require('crypto');
//const { celebrate, Joi } = require('celebrate');
const validator = require('../validator/adminValidator');
const services = require('../services/adminServices');
const adminModel = require('../models/adminModel');
const verifyOTP = require('../models/VerifyOTP');

//const nodemailer = require('nodemailer');


router.post('/register',
    validator.registerValidator,
    async (req, res) => {
        try {
            let payload = req.body;
            let adminData = await services.registerService(payload);

            return res.status(200).json({
                statusCode: 200,
                message: "sucess",
                data: adminData
            })

        } catch (error) {
            res.status(200).json({
                statusCode: 400,
                message: "somthing went wrong",
                data: {}
            })
        }
    })


router.post('/login',
    validator.loginValidator,
    (req, res) => {
        services.loginService(req, res);
    })

router.post('/loginToken',
    async (req, res) => {
         try {
            if (!req.headers.authorization) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "Access Token not found",
                    data: {}
                })
            }
            let token = req.headers.authorization.split(' ')[1];
            console.log(token)

            let adminData = await services.loginTokenService(token);

            return res.status(200).json({
                statusCode: 200,
                message: "sucess",
                data: {adminData}
            })

        } catch (error) {
            return res.status(200).json({
                statusCode: 400,
                message: "somthing went wrong",
                data: {}
            })
        }
    })

router.post('/logout', async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(200).json({
                statusCode: 200,
                message: "Access Token not found",
                data: {}
            })
        }
        let token = req.headers.authorization.split(' ')[1];
        console.log(token)

        let adminData = await services.logoutServices(token);

        return res.status(200).json({
            statusCode: 200,
            message: "sucess",
            data: adminData
        })

    } catch (error) {
        res.status(200).json({
            statusCode: 400,
            message: "somthing went wrong",
            data: {}
        })
    }
})

//forgot password
router.post('/forgotPassword',
  validator.forgotPassValidator,
    async (req, res) => {
        try {
            let payload = req.body;
            let adminData = await services.forgotPassServices(payload);

            return res.status(200).json({
                statusCode: 200,
                message: "sucess",
                data: adminData
            })
            
        }
        catch (error) {
            console.log(error);
            res.status(200).json({
                statusCode: 400,
                message: "somthing went wrong",
                data: {}
            })
        }
    })

//verify password
router.post('/verifyPassword',//validator.verifyOTPValidator ,
    async (req, res) => {
        try {
            let payload = req.body;
            console.log(payload);

            let adminData = await services.verifyOTPServices(payload);            
            return res.status(200).json({
                statusCode: 200,
                message: "sucess",
                data: adminData
            })
        }
        catch (error) {
            console.log(error);
            res.status(200).json({
                statusCode: 400,
                message: "somthing went wrong",
                data: {}
            })
        }
    })

//resetPassword
/*router.post('/resetPassword', async (req, res) => {
    try {
        let payload = req.body;
        let findData=await adminModel.findOne({emailId:payload.emailId});
        if(!findData)
        {
            return res.status(200).json({
                statusCode: 400,
                message: "mail id is not found",
                data: {}
            })

        }
        if(payload.newPassword===payload.confirmPassword)
        {
             delete adminModel.password;
             adminModel.password=payload.newPassword;
             let pass=adminModel.password;
             
            let hashObj = functions.hashPassword(pass);
             console.log(hashObj)
             delete pass;
     
             payload.salt = hashObj.salt;
             payload.newPassword = hashObj.hash;
             console.log(payload.salt);
             console.log(payload.newPassword);
     
             return res.status(200).json({  
                statusCode: 200,
                message: "sucess",
                data:{findData} 
             })
        }
        else
        {
            return res.status(200).json({
                statusCode: 400,
                message: "new password and confirm password is not equal",
                data: {}
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            statusCode: 400,
            message: "somthing went wrong",
            data: {}
        })
    }
})
*/
router.post('/resetPassword', async (req, res) => {
    try {
        let payload = req.body;
        if (payload.newPassword === payload.confirmPassword) {
            let updateData = await adminModel.updateOne({ emailId: payload.emailId },
                {
                    $set: {
                        password: payload.newPassword
                    } 
                },
                { new: true });
               console.log('11');
               let hashObj = functions.hashPassword(payload.newPassword);
               console.log('22222')
                console.log(hashObj)
                delete password;
                payload.salt = hashObj.salt;
                payload.newPassword = hashObj.hash;
                console.log(payload.salt);
                console.log('----------')
                console.log(payload.newPassword);
                console.log('----------')
                console.log(adminModel.password);

            return res.status(200).json({
                statusCode: 200,
                message: "sucess",
                data: { updateData }
            })
        }
        else {
            return res.status(200).json({
                statusCode: 400,
                message: "new password and confirm password is not equal",
                data: {}
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            statusCode: 400,
            message: "somthing went wrong",
            data: {}
        })
    }
})
module.exports = router;