const schedule = require("node-schedule");
const postgres = require("postgres");
const {response} = require("express");

const sql = postgres({
    host: '192.168.10.49',             // Postgres ip address[s] or domain name[s]
    port: 5432,                              // Postgres server port[s]
    database: 'postgres',                    // Name of database to connect to
    username: 'postgres',                      // Username of database user
    password: 'postgres',                      // Password of database user
})

function scheduleEvery10Minutes() {
    const schedule = require('node-schedule');
    const rule = new schedule.RecurrenceRule();
    // rule.minute = [0, 10, 20, 30, 40, 50];
    rule.second = [0, 10, 20, 30, 40, 50];
    const job = schedule.scheduleJob(rule, function () {
        console.log('---time to schedule')
        getBme280Data()

    });
}

async function postTo(data,table) {
    const columns = ['temperature', 'pressure', 'humidity']

    await sql`
        insert into ${sql(table)} ${
        sql(data, columns)
    }
    `
    console.log('post from esp to:', table)
}
function matchRoundFloat(data) {
    for (let key in data) {
        if (key === "pressure") {
            data[key] = Math.round(data[key] * 10) / 1000
        }
        data[key] = Math.round(data[key] * 10) / 10
    }
    console.log(data)

    return data
}

async function getBme280Data() {
    const host = '192.168.10.46'
    const path = '/bme280'
    const url = `http://${host}${path}`
    const table = "climate_2"

    const data = await fetch(url)
        .then(response => response.json())
        .then(response => matchRoundFloat(response))
        .then(response => postTo(response, table))
        .catch(() => {
            console.log("getEspData error")
        })


    return data
}

module.exports = scheduleEvery10Minutes;