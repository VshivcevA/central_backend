const express = require('express');
const bodyParser = require('body-parser');
const postgres = require('postgres');

const {resolve} = require("path");
const {response} = require("express");

const sql = postgres({
    host: '192.168.10.49',             // Postgres ip address[s] or domain name[s]
    port: 5432,                              // Postgres server port[s]
    database: 'postgres',                    // Name of database to connect to
    username: 'postgres',                      // Username of database user
    password: 'postgres',                      // Password of database user
})

const app = express();
const table = "climate_1"

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

app.get('/api/climate_1', async (req, res) => {
    // console.log('--------/api/climate_1')
    const data = await sql`
        select ${sql`
            TO_CHAR
            (timestamp, 'HH24:MI') AS time,
            temperature,
            humidity
        `}
        from ${sql(table)}
        where
            timestamp >= current_timestamp - interval '1' day
    `
    res.json(data);
})

app.get('/climate_1', async (req, res) => {
    const data = await sql`
        select ${sql`
            timestamp as time,
            temperature,
            humidity
        `}
        from ${sql(table)}
    `
    res.json(data);
});

app.get('/climate_1&1_day', async (req, res) => {
//     const days = 2
    const data = await sql`
        select ${sql`
            TO_CHAR
            (timestamp, 'HH24:MI') AS time,
            temperature,
            humidity
        `}
        from ${sql(table)}
        where
            timestamp >= current_timestamp - interval '1' day
    `
    res.json(data);
});





app.post('/climate_1', async (req, res) => {
    const data = req.body
    const columns = ['temperature', 'pressure', 'humidity']

    for (let key in data) {
        if (key === "pressure") {
            data[key] = Math.round(data[key] * 10) / 1000
        }
        data[key] = Math.round(data[key] * 10) / 10
    }

    await sql`
        insert into ${sql(table)} ${
                sql(data, columns)
        }
    `
    res.json(req.body);
});

function schedule() {
    const schedule = require('node-schedule');
    const rule = new schedule.RecurrenceRule();
    rule.minute = [0, 10, 20, 30, 40, 50];
    // rule.second = [0, 10, 20, 30, 40, 50];
    const job = schedule.scheduleJob(rule, function () {
        console.log('---time to schedule')
        getBme280Data()
            .then(response => response.json())
            .then(response => postToClimate(response))
            .catch(()=>{
                console.log("getEspData error")
            })
    });
}

schedule()

// app.get('/climate_2', async (req, res) => {
// //     const days = 2
//     const data = {'temperature': 10, 'pressure': 11, 'humidity': 1212}
//     res.json(data);
// });


async function postToClimate(data) {
    const table = "climate_1"
    const columns = ['temperature', 'pressure', 'humidity']

    for (let key in data) {
        if (key === "pressure") {
            data[key] = Math.round(data[key] * 10) / 1000
        }
        data[key] = Math.round(data[key] * 10) / 10
    }

    await sql`
        insert into ${sql(table)} ${
                sql(data, columns)
        }
    `
    console.log('post from esp')
}

async function getBme280Data() {
    const host = '192.168.10.46'
    const url = `http://${host}/bme280`
    // const url = `http://${host}:${port}/${path}`
    // .then(response=>response.json())
    // .then(response=>postToClimate2(response));
    // console.log(await fetch(url))
    return await fetch(url);
}

app.listen(3000, () => console.log('server started'));
