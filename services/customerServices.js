const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');
const functions = require('../function')
const mongoose = require('mongoose');
//const AutoIncrement = require('mongoose-sequence')(mongoose);

const addCust = async (payload) => {
    try {
        let findData = await Customer.findOne({ name: payload.name });
        if (findData) {
            throw new Error("customer already exist");
        }
        //let updateData=await addCustomer.updateOne({ $inc: { customerCode: 1 } }, {new: true })
        //console.log(updateData);

        let createData = await Customer.create(payload);

        //addCustomer.plugin(AutoIncrement);
       // let custData=await addCustomer.plugin(AutoIncrement, {inc_field: 'customerCode'});
       // console.log(custData);

        return createData
    } catch (error) {
        throw error;
    }
}

const getCust = async (query, token) => {
    try {
        let criteria = [];
        if (query.name != undefined);
        {
            criteria.push({ $match: { name: query.name } });
        }
        let custData = await Customer.aggregate(criteria);

        if (query.limit != undefined) {
            criteria.push({ $limit: limit.query })
        }
        if (query.skip != undefined) {
            criteria.push({ $skip: query.skip })
        }
        return custData
    } catch (error) {
        console.log(error);
        throw error;
    }

}

const getAllCust = async (token) => {
    try {
        let custData = await Customer.find();
        return custData
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const updateCust = async (payload) => {
    try {
        let updateData = await Customer.update({ name: payload.name },
            {
                $set: {
                    name:payload.name,
                    customerCode:payload.customerCode,
                    address:payload.address,
                    emailId:payload.emailId,
                    countryCode:payload.countryCode,
                    phoneNo:payload.phoneNo,
                    gstIn:payload.gstIn
                }
            },
            { new: true })
        return updateData;

    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = { addCust, getCust, getAllCust, updateCust };