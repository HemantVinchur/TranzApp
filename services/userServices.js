const functions = require('../function');
const grPage = require('../models/grPage');
const consignor = require('../models/consignor');
const consignee=require('../models/consignee');
const goods = require('../models/goods');
const freight = require('../models/freight');
const invoice = require('../models/invoice');
const truckDetails = require('../models/truckDetails');

//fetch config

const fetchConfig = async (payload) => {
    try {
        let data = await fetchUpConfig.find(payload);
        if (!data) {
            throw new Error('user already exist');
        }
        return data

    } catch (error) {
        console.error(error);
        throw error;
    }

}

const GRServices = async (payload) => {
    try {
        let grPageFindData = await grPage.findOne({ grNum: payload.grNum });
        if (grPageFindData) {

            throw new Error('user already exist');
        }
        if (payload.packageQuantity || payload.rate) 
        {
            payload.total=parseInt(payload.packageQuantity) * parseInt(payload.rate);
        }
        else (payload.chargeWeight || payload.rate) 
        {
            payload.total = parseInt(payload.chargeWeight) * parseInt(payload.rate);

        }

        payload.freight = payload.total;
        payload.totalFreight = parseInt(payload.freight) + parseInt(payload.labour) + parseInt(payload.cartage) + parseInt(payload.billTCharge) + parseInt(payload.doorDeliveryCharge) + parseInt(payload.previousFreight)
        
        let grPageData = await grPage.create(payload);

        let consignorData = await consignor.create(payload);

        let consigneeData=await consignee.create(payload);

        let goodsData = await goods.create(payload);

        let freightData = await freight.create(payload);

        let invoiceData = await invoice.create(payload);

        return { grPageData, consignorData, consigneeData ,goodsData, freightData, invoiceData }

    } catch (error) {
        console.log(error)
        //console.error(error);
        throw error;
    }
}

//challan page
let challanPage = async (payload) => {
    try {
        let criteria = [];
        let truckData = await truckDetails.create(payload);
        if (payload.grNum != undefined) {
            criteria.push({ $match: { grNum: parseInt(payload.grNum) } })
        }

        let consignorData = await consignor.aggregate(criteria);
        let goodsData = await goods.aggregate(criteria);
        let freightData = await freight.aggregate(criteria);

        return { truckData, consignorData, goodsData, freightData }

    } catch (err) {
        console.error(err);
        throw err;
    }

}



//get gr details

const showGRPage = async (query) => {
    try {
        let criteria = [];
        if (query.grNum != undefined) {
            criteria.push({ $match: { grNum: parseInt(query.grNum) } });
        }

        let grData = await grPage.aggregate(criteria);
        let consignorData = await consignor.aggregate(criteria);
        let consigneeData = await consignee.aggregate(criteria);
        let goodsData = await goods.aggregate(criteria);
        let freightData = await freight.aggregate(criteria);
        let invoiceData = await invoice.aggregate(criteria);
        console.log(findData);
        if (!findData) {
            return res.status(200).json({
                statusCode: 400,
                message: "user not found",
                data: {}
            })
        }

        if (query.limit != undefined) {
            criteria.push({ $limit: query.limit })
        }
        if (query.skip != undefined) {
            criteria.push({ $skip: query.skip })
        }

        console.log(criteria);

        return { grData, consignorData,consigneeData, goodsData, freightData, invoiceData }


    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { fetchConfig, GRServices, showGRPage, challanPage };