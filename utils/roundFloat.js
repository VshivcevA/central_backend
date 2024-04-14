function roundFloat(data) {
    for (let key in data) {
        if (key === "pressure") {
            data[key] = Math.round(data[key] * 10) / 1000
        }
        data[key] = Math.round(data[key] * 10) / 10
    }
    return data
}
module.exports = roundFloat