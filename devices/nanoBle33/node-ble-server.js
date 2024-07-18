const nanoBle33Config = require("../../conf/nanoBle33Config");
const express = require('express');
const bleApp = express();
const noble = require("@abandonware/noble");
const roundFloat = require("../../utils/roundFloat");
const insertInto = require("../../utils/insertInto");

bleApp.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    res.setHeader('Access-Control-Allow-Private-Network', "true");
    next();
});


const nanoBle33Ina226Data = {}
const nanoBle33Bme280Data = {}
bleApp.get('/', function (req, res) {

        noble.on('stateChange', async (state) => {
            if (state === 'poweredOn') {
                await noble.startScanningAsync([nanoBle33Config.ina226.service.UUID, nanoBle33Config.bme280.service.UUID]);
            }
        });

        noble.on('discover', async (peripheral) => {
            await noble.stopScanningAsync();
            await peripheral.connectAsync();
            const {services, characteristics} = await peripheral.discoverSomeServicesAndCharacteristicsAsync([nanoBle33Config.ina226.service.UUID, nanoBle33Config.bme280.service.UUID], [nanoBle33Config.ina226.characteristics.voltage.UUID, nanoBle33Config.bme280.characteristics.temperature.UUID, nanoBle33Config.bme280.characteristics.humidity.UUID, nanoBle33Config.bme280.characteristics.pressure.UUID])
            // const {services} = await peripheral.discoverServicesAsync([nanoBle33Config.ina226.service.UUID, nanoBle33Config.bme280.service.UUID])
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
                    const table = "nanoble33battery"
                    const columns = ['voltage']
                    // console.log('nanoBle33Ina226Data',nanoBle33Ina226Data)
                    await insertInto(nanoBle33Ina226Data, table, columns)
                }

                if (service.uuid === nanoBle33Config.bme280.service.UUID) {
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
                    const table = "climate_2"
                    const columns = ['temperature', 'pressure', 'humidity']
                    await insertInto(nanoBle33Bme280Data, table, columns)
                }
            }
            await peripheral.disconnectAsync()
            res.json(nanoBle33Ina226Data)
            noble.removeAllListeners();
            process.exit(0);

        });
        setTimeout(()=>{
            console.log('setTimeout exit')
            noble.removeAllListeners();
            process.exit(0);
        },1000*60*3)
})

bleApp.listen(3080, () => console.log('server BLE started'));
