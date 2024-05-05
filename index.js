const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rootRouter =  require('./router/rootRouter');
const scheduleEvery10Minutes = require("./shedule/scheduleEvery10Minutes");

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    res.setHeader('Access-Control-Allow-Private-Network', "true");
    next();
});

app.use('/', rootRouter)

if (process.env.NODE_ENV === 'production') {
    scheduleEvery10Minutes()
}
app.listen(3000, () => console.log('server started'));
