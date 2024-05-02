//     127.0.0.1 for localhost
//     0.0.0.0 for all interfaces

async function getNanoBle33Bme280Data() {
    fetch('http://192.168.10.49:3080')
        .catch(()=>{console.log('ble error')})

}

module.exports = getNanoBle33Bme280Data