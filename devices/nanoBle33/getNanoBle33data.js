const noble = require('@abandonware/noble');
const roundFloat = require("../../utils/roundFloat");
const insertInto = require("../../utils/insertInto");

const nanoBle33Config = {
    ina226: {
        service: {
            UUID: '180f',
        },
        characteristics: {
            voltage: {
                name: 'voltage',
                UUID: '85891a10454f6dbd7cfff590e0ac1ce9'
                // UUID: '85891a-1045-4f6d-bd7c-1f590e0ac1ce9'
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

const nanoBle33Ina226Data = {}
const nanoBle33Bme280Data = {}


noble.on('stateChange', async (state) => {
    if (state === 'poweredOn') {
        await noble.startScanningAsync([nanoBle33Config.ina226.service.UUID, nanoBle33Config.bme280.service.UUID]);
    }
});
noble.on('discover', async (peripheral) => {
    await noble.stopScanningAsync();
    await peripheral.connectAsync();
    const {services,characteristics} = await peripheral.discoverSomeServicesAndCharacteristicsAsync([nanoBle33Config.ina226.service.UUID,nanoBle33Config.bme280.service.UUID],[nanoBle33Config.ina226.characteristics.voltage.UUID,nanoBle33Config.bme280.characteristics.temperature.UUID,nanoBle33Config.bme280.characteristics.humidity.UUID,nanoBle33Config.bme280.characteristics.pressure.UUID])
    for (const service of services) {
        if (service.uuid === nanoBle33Config.ina226.service.UUID) {
            for (const characteristic of service.characteristics) {
                let name = ''

                switch (characteristic.uuid) {
                    case nanoBle33Config.ina226.characteristics.voltage.UUID:
                        name = nanoBle33Config.ina226.characteristics.voltage.name
                }
                nanoBle33Ina226Data[name] = (await characteristic.readAsync()).readFloatLE()
            }
            roundFloat(nanoBle33Ina226Data)
            // console.log(nanoBle33Ina226Data)
            const table = "nanoBle33Battery"
            const columns = ['voltage']
            await insertInto(nanoBle33Ina226Data, table, columns)

        }

        if (service.uuid === nanoBle33Config.bme280.service.UUID) {
            // console.log('bme280')
            for (const characteristic of service.characteristics) {
                let name = ''

                switch (characteristic.uuid) {
                    case nanoBle33Config.bme280.characteristics.temperature.UUID:
                        name = 'temperature'
                        break
                    case nanoBle33Config.bme280.characteristics.humidity.UUID:
                        name = 'humidity'
                        break
                    case nanoBle33Config.bme280.characteristics.pressure.UUID:
                        name = 'pressure'
                }
                nanoBle33Bme280Data[name] = (await characteristic.readAsync()).readFloatLE()

            }
            roundFloat(nanoBle33Bme280Data)
            // console.log(nanoBle33Bme280Data)
            const table = "climate_2"
            const columns = ['temperature', 'pressure', 'humidity']
            await insertInto(nanoBle33Bme280Data, table, columns)
        }

    }

    await peripheral.disconnectAsync();
    process.exit(0);
});
