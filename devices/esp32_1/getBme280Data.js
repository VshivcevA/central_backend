const roundFloat = require("../../utils/roundFloat");
const insertInto = require("../../utils/insertInto");

async function getBme280Data() {
    const host = '192.168.10.46'
    const path = '/bme280'
    const url = `http://${host}${path}`
    const table = "climate_1"
    const columns = ['temperature', 'pressure', 'humidity']

    return await fetch(url)
        .then(response => response.json())
        .then(response => roundFloat(response))
        .then(response => insertInto(response, table, columns))
        .catch(() => {
            console.log("get esp32_1 bme320 data error")
        })
}
module.exports = getBme280Data;