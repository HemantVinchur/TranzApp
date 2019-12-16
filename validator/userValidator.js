const { celebrate, Joi } = require('celebrate');

const grValidator = celebrate({
    body: Joi.object().keys({
        grNum: Joi.number().min(4).required(),
        bookedAt: Joi.string().regex(/^[a-zA-Z]{1,30}$/).optional(),
        payType: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        vehicleNum: Joi.string().regex(/^[a-zA-Z]{2}[0-9]{2}[a-zA-Z]{2}[0-9]{4}$/).required(),

        consignorCode: Joi.number().required(),
        consignorName: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        from: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        consignorGst: Joi.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).required(),
        consignorPhone: Joi.string().regex(/^[0-9]{10}$/).required(),
        consigneeCode: Joi.number().required(),
        consigneeName: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        to: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        consigneeGst: Joi.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).required(),
        consigneePhone: Joi.string().regex(/^[0-9]{10}$/).required(),

        packageQuantity: Joi.number().optional(),
        actualWeight: Joi.number().optional(),
        chargeWeight: Joi.number().optional(),
        rate: Joi.number().optional(),
        discription: Joi.string().regex(/^[a-zA-Z]{1,30}$/).optional(),
        

        freight: Joi.number().optional(),
        labour: Joi.number().required(),
        cartage: Joi.number().required(),
        billTCharge: Joi.number().required(),
        doorDeliveryCharge: Joi.number().required(),
        previousFreight: Joi.number().optional(),
        totalFreight: Joi.number().optional(),

        invoiceNumber: Joi.number().required(),
        invoiceValue: Joi.number().required(),
        date: Joi.date().optional(),
        challanNumber: Joi.number().required(),
        challanDate: Joi.date().required(),
        deliveryOffice: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        deliveryName: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        total: Joi.number().optional()
       
    })
})


const challanPageValidator = celebrate({
    body: Joi.object().keys({
        challanNumber: Joi.number().required(),
        from: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        to: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        date: Joi.date().required(),
        truckNumber: Joi.string().required(),
        driverName: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        ownerName: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        engineNumber: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        chechiseNumber: Joi.string().required(),
        consignorName: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        consigneeName: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        grNum: Joi.number().required(),
        packageQuantity: Joi.number().required(),
        discription: Joi.string().regex(/^[a-zA-Z]{1,30}$/).required(),
        actualWeight: Joi.number().required(),
        totalFreight: Joi.number().required()
    })

})

module.exports = { grValidator, challanPageValidator };