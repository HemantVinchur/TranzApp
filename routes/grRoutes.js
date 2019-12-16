const router = require('express').Router();

//Get GR
router.get('/getGR', async (req, res) => {
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
