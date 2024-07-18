const nanoBle33Config = {
    ina226: {
        service: {
            UUID: '180f',
        },
        characteristics: {
            voltage: {
                name: 'voltage',
                UUID: '85891a10454f6dbd7cfff590e0ac1ce9'
            }
        }
    },
    bme280: {
        service: {
            UUID: '1b21764b490743caae2d6a6281725975',
        },
        characteristics: {
            temperature: {
                name: 'temperature',
                UUID: '8e44a0e83b4b4b2581179a9dd06abce3',
            },
            pressure: {
                name: 'pressure',
                UUID: '7dcfa0a4b6184fc7a2481aeb9b7fda18'
            },
            humidity: {
                name: 'humidity',
                UUID: 'dd093747ed37436cb1740f9818a474c9'
            }
        }
    },
}
module.exports = nanoBle33Config