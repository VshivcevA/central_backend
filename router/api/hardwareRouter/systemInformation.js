const si = require('systeminformation');
const getFixSystemInfoData = require("./getFixSystemInfoData");

async function systemInformation() {
    let systemInfoData = []
    let valueObject = {
        time:'current,uptime',

        cpu: 'vendor,manufacturer',
        cpuTemperature:'main',
        cpuCurrentSpeed:'*',
        currentLoad:'currentLoad,cpus',

        mem: 'total,used,free,active,available,buffers,cached,buffcache,swaptotal,swapused',
        osInfo:'platform,distro,release,codename,kernel',
        disksIO:"*",
        fsSize:"*",
    }
    await si.get(valueObject)
        .then(result => systemInfoData = result);

    return getFixSystemInfoData(systemInfoData)
}
module.exports = systemInformation;