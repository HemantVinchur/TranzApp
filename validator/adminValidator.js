const { celebrate, Joi } = require('celebrate');

const registerValidator = celebrate({
    body: Joi.object().keys({
        emailId: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,16}$/).required(),
        firstName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
        lastName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
        countryCode: Joi.number().min(2).required(),
        contactNo: Joi.string().regex(/^[0-9]{10}$/).required(),
        enterpriseName: Joi.string().required(),
        address: Joi.string().required(),
        latitude: Joi.string().optional(),
        longitude: Joi.string().optional(),
        deviceToken: Joi.string().optional(),
        deviceType: Joi.string().optional()
    })
})


const loginValidator = celebrate({
    body: Joi.object().keys({
        emailId: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,16}$/).required()
    })
})

const forgotPassValidator=celebrate({
    body: Joi.object().keys({
        emailId: Joi.string().email().required(),

    })
})

const verifyOTPValidator=celebrate({
    body: Joi.object().keys({
        otp: Joi.number().required(),

    })
})

module.exports = { registerValidator, loginValidator,forgotPassValidator ,verifyOTPValidator}