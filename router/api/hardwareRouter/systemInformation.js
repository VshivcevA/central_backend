const si = require('systeminformation');

async function systemInformation() {
    let systemInfoData = []
    // systemInfoData['uptime']= await si.time().uptime
    let valueObject = {
        cpu: '*',
        osInfo: 'platform, release',
        system: 'model, manufacturer'
    }
    // await si.getAllData()
    await si.get(valueObject)
        .then(result => systemInfoData = result);
    // console.log(systemInfoData)
    await si.getAllData()
        .then(result => systemInfoData = result)
    return systemInfoData
}
module.exports = systemInformation;


// function usersCallback(data) {
//     console.log('Power usage now: ' + (data.battery.acconnected ? 'AC' : 'battery'));
// }
//
// // now define the observer function
// let observer = si.observe(valueObject, 1000, usersCallback);
//
// // In this example we stop our observer function after 30 seconds
// setTimeout(() => {
//     clearInterval(observer)
// }, 30000);