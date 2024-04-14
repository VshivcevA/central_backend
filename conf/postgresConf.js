const postgres = require("postgres");

const sql = postgres({
    host: '192.168.10.49',             // Postgres ip address[s] or domain name[s]
    port: 5432,                              // Postgres server port[s]
    database: 'postgres',                    // Name of database to connect to
    username: 'postgres',                      // Username of database user
    password: 'postgres',                      // Password of database user
})

module.exports = sql