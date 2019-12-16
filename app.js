const express = require('express');
const morgan = require('morgan');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const assert = require('assert');
const cors = require('cors');

//require('dotenv').config();

const config = require('./config/config');
const routes = require('./routes');

const app = express()

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//const url = "mongodb://localhost:27017/transpotation";
console.log(config.URI);
mongoose.connect(config.URI, { useNewUrlParser: true })

    .then(() => {
        console.log('db is connected sucessfully');
    })

    .catch((error) => {
        console.log('error', error)
        process.exit(1);
    })

app.use('/api', routes);

app.use(errors())

app.use((req, res, next) => {
    res.status(404).json({
        statusCode: 400,
        message: "not found",
        data: {}
    })
})

app.listen(config.port, () => {
    console.log('server is start @ ', config.port)
})