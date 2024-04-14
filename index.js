const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const postgres = require('postgres');
const rootRouter =  require('./router/rootRouter');
// import climateReducer from '../features/climateRender/climateSlice'
const scheduleEvery10Minutes = require("./shedule/scheduleEvery10Minutes");


const {resolve} = require("path");
const {response} = require("express");

app.use(bodyParser.json());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', "true");
    res.setHeader('Access-Control-Allow-Private-Network', "true");
    // Pass to next layer of middleware
    next();
});

app.use('/', rootRouter)

scheduleEvery10Minutes()

app.listen(3000, () => console.log('server started'));
