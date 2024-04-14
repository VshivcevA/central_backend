const express = require('express')
const postgres = require("postgres");
const climateRouter = express.Router()

climateRouter.use((req, res, next)=>{
    console.log('climate')
    next()
})

const sql = postgres({
    host: '192.168.10.49',             // Postgres ip address[s] or domain name[s]
    port: 5432,                              // Postgres server port[s]
    database: 'postgres',                    // Name of database to connect to
    username: 'postgres',                      // Username of database user
    password: 'postgres',                      // Password of database user
})
const table = "climate_1"

climateRouter.get('/1', async (req, res) => {
    const data = await sql`
        select ${sql`
            TO_CHAR
            (timestamp, 'HH24:MI') AS time,
            temperature,
            humidity
        `}
        from ${sql(table)}
        where
            timestamp >= current_timestamp - interval '1' day
    `
    res.json(data);
})

//todo проверить &1_day
climateRouter.get('/1&1_day', async (req, res) => {
//     const days = 2
    const data = await sql`
        select ${sql`
            TO_CHAR
            (timestamp, 'HH24:MI') AS time,
            temperature,
            humidity
        `}
        from ${sql(table)}
        where
            timestamp >= current_timestamp - interval '1' day
    `
    res.json(data);
});

climateRouter.post('/climate_1', async (req, res) => {
    const data = req.body
    const columns = ['temperature', 'pressure', 'humidity']

    for (let key in data) {
        if (key === "pressure") {
            data[key] = Math.round(data[key] * 10) / 1000
        }
        data[key] = Math.round(data[key] * 10) / 10
    }

    await sql`
        insert into ${sql(table)} ${
        sql(data, columns)
    }
    `
    res.json(req.body);
});

module.exports = climateRouter