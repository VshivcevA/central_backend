const express = require('express')
const climateRouter = express.Router()
const sql = require("../../../conf/postgresConf");

climateRouter.use((req, res, next)=>{
    next()
})


climateRouter.get('/1', async (req, res) => {
    let table = "climate_1"
    const timestampMask = 'YYYY-MM-DD HH24:MI'
    const postgresData = await sql`
        select ${sql`
            TO_CHAR
            (timestamp, ${timestampMask}) as timestamp,
            temperature,
            humidity
        `}
        from ${sql(table)}
        where
            timestamp between
                to_timestamp(${req.query.dateFrom+' '+req.query.timeFrom}, ${timestampMask})
            and
                to_timestamp(${req.query.dateTo+' '+req.query.timeTo}, ${timestampMask})
    `
    if(postgresData){
        res.json(postgresData)
    } else {
        console.error(`Error: no data`)
    }

})

module.exports = climateRouter