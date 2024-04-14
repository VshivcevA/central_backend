const schedule = require("node-schedule");

function scheduleEvery10Minutes() {
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
    const path = 'bme280'
    const url = `http://${host}/${path}`
    // .then(response=>response.json())
    // .then(response=>postToClimate2(response));
    // console.log(await fetch(url))
    return await fetch(url);
}

module.exports = scheduleEvery10Minutes;