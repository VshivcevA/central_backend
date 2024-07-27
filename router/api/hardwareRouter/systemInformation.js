const si = require('systeminformation');

async function systemInformation() {
    let systemInfoData = []
    let valueObject = {
        time:'current,uptime,timezone',
        cpu: 'vendor,manufacturer,cores',
        cpuCurrentSpeed:'*',
        cpuTemperature:'main',
        mem: 'total,used,free,active,available,buffers,cached,buffcache,swaptotal,swapused',
        osInfo:'platform,distro,release,codename,kernel',
        currentLoad:'currentLoad',
        disksIO:"*",
        fsSize:"*",
    }
    await si.get(valueObject)
        .then(result => systemInfoData = result);
    return systemInfoData
}
module.exports = systemInformation;