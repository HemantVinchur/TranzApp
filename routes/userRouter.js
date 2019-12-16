const router = require('express').Router();
//const functions=require('../function');
const validator = require('../validator/userValidator')
const services = require('../services/userServices')


const grPage = require('../models/grPage');
const consignor = require('../models/consignor');
const goods = require('../models/goods');
const invoice = require('../models/invoice');
const freight = require('../models/freight');

//fetchUpConfig

router.get('/fetchUpConfig', async (req, res) => {
    try {
        let payload = req.params;
        let data = await services.fetchConfig(payload);
        return res.status(200).json({

            statusCode: 200,
            message: "sucess",
            data: data
        })

    } catch (error) {
        res.status(200).json({
            statusCode: 400,
            message: "somthing went wrong",
            data: {}
        })
    }
})

// GR page
router.post('/GRPage',
    validator.grValidator,
    async (req, res) => {
        try {
            let payload = req.body;
            let GrPage = await services.GRServices(payload);

            return res.status(200).json({
                statusCode: 200,
                message: "sucess",
                data: GrPage
            })

        } catch (error) {
            console.log(error);
            res.status(200).json({
                statusCode: 400,
                message: "somthing went wrong",
                data: {}
            })
        }
    })

//challan page

router.post('/challan', async (req, res) => {
    try {
        let payload = req.body;
        let userData = await services.challanPage(payload);

        return res.status(200).json({
            statusCode: 400,
            message: "sucess",
            data: userData
        })

    } catch (error) {
        return res.status(200).json({
            statusCode: 400,
            message: "somthing went wrong",
            data: {}
        })
    }
})
//get GR page

router.get('/getGRPage', async (req, res) => {
    try {
        let query = req.query;
        console.log(query);

        let userData = await services.showGRPage(query);

        return res.json({
            statusCode: 200,
            message: "Success",
            data: { userData }
        });

    } catch (error) {
        console.log(error);
        res.status(200).json({
            statusCode: 400,
            message: "somthing went wrong",
            data: {}
        })
    }
})



//display table

router.post('/displayTable', async (req, res) => {
    try {
        console.log('11111')
        let payload = req.body;
        console.log(payload);

        if (payload.packageQuantity || payload.ratePerPeice) {
            payload.total = parseInt(payload.packageQuantity) * parseInt(payload.ratePerPeice);

        }
        else {

            payload.total = parseInt(payload.chargeWeight) * parseInt(payload.ratePerKg);
        }

        let createData = await goods.create(payload);

        return res.status(200).json({
            statusCode: 200,
            message: "sucess",
            data: { createData }
        })

    } catch (error) {
        console.log(error);
        res.status(200).json({
            statusCode: 400,
            message: "somthing went wrong",
            data: {}
        })

    }
})

module.exports = router;