//     127.0.0.1 for localhost
//     0.0.0.0 for all interfaces

async function getNanoBle33Bme280Data() {
    //
    // noble.on('stateChange', async (state) => {
    //     if (state === 'poweredOn') {
    //         await noble.startScanningAsync([nanoBle33Config.ina226.service.UUID, nanoBle33Config.bme280.service.UUID]);
    //     }
    // });
    //
    // noble.on('discover', async (peripheral) => {
    //     console.log('discover')
    //     await noble.stopScanningAsync();
    //     await peripheral.connectAsync();
    //     const {services, characteristics} = await peripheral.discoverSomeServicesAndCharacteristicsAsync([nanoBle33Config.ina226.service.UUID, nanoBle33Config.bme280.service.UUID], [nanoBle33Config.ina226.characteristics.voltage.UUID, nanoBle33Config.bme280.characteristics.temperature.UUID, nanoBle33Config.bme280.characteristics.humidity.UUID, nanoBle33Config.bme280.characteristics.pressure.UUID])
    //     // const {services} = await peripheral.discoverServicesAsync([nanoBle33Config.ina226.service.UUID, nanoBle33Config.bme280.service.UUID])
    //     for (const service of services) {
    //         if (service.uuid === nanoBle33Config.ina226.service.UUID) {
    //             for (const characteristic of service.characteristics) {
    //                 let name = ''
    //                 switch (characteristic.uuid) {
    //                     case nanoBle33Config.ina226.characteristics.voltage.UUID:
    //                         name = nanoBle33Config.ina226.characteristics.voltage.name
    //                 }
    //                 nanoBle33Ina226Data[name] = (await characteristic.readAsync()).readFloatLE()
    //             }
    //             roundFloat(nanoBle33Ina226Data)
    //             const table = "nanoble33battery"
    //             const columns = ['voltage']
    //             await insertInto(nanoBle33Ina226Data, table, columns)
    //         }
    //
    //         if (service.uuid === nanoBle33Config.bme280.service.UUID) {
    //             for (const characteristic of service.characteristics) {
    //                 let name = ''
    //                 switch (characteristic.uuid) {
    //                     case nanoBle33Config.bme280.characteristics.temperature.UUID:
    //                         name = 'temperature'
    //                         break
    //                     case nanoBle33Config.bme280.characteristics.humidity.UUID:
    //                         name = 'humidity'
    //                         break
    //                     case nanoBle33Config.bme280.characteristics.pressure.UUID:
    //                         name = 'pressure'
    //                 }
    //                 nanoBle33Bme280Data[name] = (await characteristic.readAsync()).readFloatLE()
    //             }
    //             roundFloat(nanoBle33Bme280Data)
    //             const table = "climate_2"
    //             const columns = ['temperature', 'pressure', 'humidity']
    //             await insertInto(nanoBle33Bme280Data, table, columns)
    //         }
    //     }
    //     await peripheral.disconnectAsync()
    //     // res.json(nanoBle33Ina226Data)
    //     noble.removeAllListeners();
    //     console.log('removeAllListeners')
    //
    //     // process.exit(0);
    //     // console.log('process.exit(0)')
    //
    // });
    // console.log('set')
    // setTimeout(()=>{
    //     noble.removeAllListeners();
    //     console.log('set removeAllListeners')
    //     // console.log('exit')
    //     // process.exit(0);
    // },1000*60*1.5)
    //
    //
    fetch('http://192.168.10.49:3080')
        .catch(()=>{console.log('ble error')})

}

module.exports = getNanoBle33Bme280Data