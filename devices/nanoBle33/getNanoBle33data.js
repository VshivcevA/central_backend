//     127.0.0.1 for localhost
//     0.0.0.0 for all interfaces

async function getNanoBle33Bme280Data() {
    fetch(`http://${process.env.NODE_BLE_URL}:${process.env.NODE_BLE_PORT}`)
        .catch(()=>{console.log('ble error')})
//     todo обработать успех тут а не в bleServer
}

module.exports = getNanoBle33Bme280Data