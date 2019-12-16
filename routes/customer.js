const router = require('express').Router();
//const addCustomer=require('../models/AddCustomer');
const functions = require('../function');
const jwt = require('jsonwebtoken');
const custServices = require('../services/customerServices');
const custValidator = require('../validator/customerValidator');


router.post('/addCustomer',
    custValidator.addCustValidator
    , async (req, res) => {
        try {
            let payload = req.body;
            if (!req.headers.authorization) {
                res.status(200).json({
                    statusCode: 400,
                    message: "acess token is not exist",
                    data: {}
                });
            }
            let token = req.headers.authorization.split(' ')[1];
            console.log(token);

            let decodedData = await functions.authenticate(token);
            if (!decodedData) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "somthing went wrong1",
                    data: {}
                });
            }

            let custData = await custServices.addCust(payload);

            return res.status(200).json({
                statusCode: 200,
                message: "Success",
                data: { custData, token }
            });

        } catch (error) {
            console.log(error)
            res.status(200).json({
                statusCode: 400,
                message: "somthing went wrong",
                data: {}
            })
        }
    })

// console.log("Hii")
router.get('/getCustomer', async (req, res) => {
    console.log("Hii")
    try {
        let query = req.query;
        console.log(query)
        if (!req.headers.authorization) {
            return res.status(200).json({
                statusCode: 400,
                message: "access token is not exist",
                data: {}
            })
        }
        let token = req.headers.authorization.split(' ')[1];
        let decodedData = await functions.authenticate(token);
        if (!decodedData) {
            return res.status(200).json({
                statusCode: 400,
                message: "somthing went wrong 1",
                data: {}
            })
        }

        let custData = await custServices.getCust(query, token);

        return res.status(200).json({
            statusCode: 200,
            message: "sucess",
            data: { custData, token }
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

//get all customer

router.get('/getAllCustomer', async (req, res) => {
    try {
        //        let query=req.query;

        if (!req.headers.authorization) {
            return res.status(200).json({
                statusCode: 400,
                message: "access token is not exist",
                data: {}
            })
        }
        let token = req.headers.authorization.split(' ')[1];
        let decodedData = await functions.authenticate(token);
        if (!decodedData) {
            return res.status(200).json({
                statusCode: 400,
                message: "somthing went wrong 1",
                data: {}
            })
        }

        let custData = await custServices.getAllCust(token);

        return res.status(200).json({
            statusCode: 200,
            message: "sucess",
            data: { custData, token }
        })

    } catch (error) {
        console.log(error);
        res.status(200).json({
            statusCode: 400,
            message: "somthing went wrong",
            data: {}
        })
    }
});


//update customer details

router.put('/updateCustomer',
    custValidator.updateCustValidator,
    async (req, res) => {
        try {
            let payload = req.body;
            console.log(payload);
            if (!req.headers.authorization) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "access token not found",
                    data: {}
                })

            }
            let token = req.headers.authorization.split(' ')[1];
            console.log(token);
            let decodedData = await functions.authenticate(token);
            if (!decodedData) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "somthing went wrong 1",
                    data: {}
                })
            }

            let custData = await custServices.updateCust(payload);

            return res.status(200).json({
                statusCode: 200,
                message: "sucess",
                data: { custData, token }
            })

        } catch (error) {
            console.log(error);
            res.status(200).json({
                statusCode: 400,
                message: "somthing went wrong",
                data: {}
            })


        }
    });

module.exports = router;