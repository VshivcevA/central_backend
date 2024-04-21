function roundFloat(data) {
    for (let key in data) {
        if (key === "voltage") {
            data[key] = data[key].toFixed(2)
        } else if (key === "pressure") {
            data[key] = (data[key] / 100).toFixed(1)
        } else {
            data[key] = data[key].toFixed(1)
        }
        data[key] = Number(data[key])
    }
    return data
}
module.exports = roundFloat
//todo переделать на свич