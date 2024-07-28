const unixTimeToTime = require("../../../utils/unixTimeToTime");
const byteToMegabyte = require("../../../utils/byteToMegabyte");
let fixSystemInfoData = {}

function getFixSystemInfoData(systemInfoData) {
    fixSystemInfoData.time = {
        'Current time': new Date(systemInfoData.time.current).toLocaleString('ru-RU'),
        'Uptime': unixTimeToTime(systemInfoData.time.uptime)
    }

    fixSystemInfoData.cpu = {
        manufacturer: systemInfoData.cpu.manufacturer,
        model: systemInfoData.cpu.vendor,
        temperature: systemInfoData.cpuTemperature.main,
        load: Math.floor(systemInfoData.currentLoad.currentLoad),
        frequency:{
            min:systemInfoData.cpuCurrentSpeed.min,
            max:systemInfoData.cpuCurrentSpeed.max,
            avg:systemInfoData.cpuCurrentSpeed.avg,
        },
        cores: [],
    }
    systemInfoData.cpuCurrentSpeed.cores.forEach((cpu,index) => {
        fixSystemInfoData.cpu.cores.push({
            frequency: cpu,
            load: Math.floor(systemInfoData.currentLoad.cpus[index].load),
        })
    })

    fixSystemInfoData.memory = {}
    for (let memKey in systemInfoData.mem) {
        fixSystemInfoData.memory[memKey] = byteToMegabyte(systemInfoData.mem[memKey])
    }

    fixSystemInfoData.disk = {
        size: byteToMegabyte(systemInfoData.fsSize[0].size),
        used: byteToMegabyte(systemInfoData.fsSize[0].used),
        available: byteToMegabyte(systemInfoData.fsSize[0].available),
        use: byteToMegabyte(systemInfoData.fsSize[0].use),
    }
    for (let memKey in systemInfoData.disksIO) {
        fixSystemInfoData.disk[memKey] = byteToMegabyte(systemInfoData.disksIO[memKey])
    }

    fixSystemInfoData.os = systemInfoData.osInfo

    return fixSystemInfoData
}

module.exports = getFixSystemInfoData;