const { celebrate, Joi } = require('celebrate');

const addCustValidator = celebrate({
    body: Joi.object().keys({
        name: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
        customerCode: Joi.string().regex(/^[a-zA-Z0-9]{4}$/).required(),
        address: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        emailId: Joi.string().email().required(),
        countryCode: Joi.number().min(2).required(),
        phoneNo: Joi.string().regex(/^[0-9]{10}$/).required(),
        gstIn: Joi.string().required(),
        latitude: Joi.string().optional(),
        longitude: Joi.string().optional(),
    })
});

const updateCustValidator = celebrate({
    body: Joi.object().keys({
        name: Joi.string().regex(/^[a-zA-Z]{3,30}$/).optional(),
        address: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).optional(),
        emailId: Joi.string().email().optional(),
        countryCode: Joi.number().min(2).optional(),
        phoneNo: Joi.string().regex(/^[0-9]{10}$/).optional(),
        gstIn: Joi.string().optional(),
        latitude: Joi.string().optional(),
        longitude: Joi.string().optional(),
    })
});

module.exports = { addCustValidator, updateCustValidator }