function roundFloat(data) {
    for (let key in data) {
        if (key === "voltage") {
            data[key] = data[key].toFixed(2)
        } else if (key === "pressure") {
            data[key] = data[key].toFixed(1) / 100
        } else {
            data[key] = data[key].toFixed(1)
        }
        data[key] = Number(data[key])
    }
    return data
}
module.exports = roundFloat