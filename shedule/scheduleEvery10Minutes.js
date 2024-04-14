const getBme280Data = require("../devices/esp32_1/getBme280Data");

function scheduleEvery10Minutes() {
    const schedule = require('node-schedule');
    const rule = new schedule.RecurrenceRule();
    rule.minute = [0, 10, 20, 30, 40, 50];
    // rule.second = [0, 10, 20, 30, 40, 50];
    const job = schedule.scheduleJob(rule, function () {
        console.log('--- schedule')
        getBme280Data()
    });
}

module.exports = scheduleEvery10Minutes;