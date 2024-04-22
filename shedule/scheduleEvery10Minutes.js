const schedule = require('node-schedule');
const getBme280Data = require("../devices/esp32_1/getBme280Data");
const getNanoBle33data = require("../devices/nanoBle33/getNanoBle33data");

function scheduleEvery10Minutes() {
    const rule = new schedule.RecurrenceRule();
    rule.minute = [0, 10, 20, 30, 40, 50];
    // rule.second = [0, 10, 20, 30, 40, 50];
    const job = schedule.scheduleJob(rule, function () {
        console.log('--- schedule')
        getBme280Data()
        fetch('http://192.168.10.49:3080')
            .then(()=>{console.log('ble get')})
            .catch(()=>{console.log('ble error')})
        // getNanoBle33data()
    });
}

module.exports = scheduleEvery10Minutes;