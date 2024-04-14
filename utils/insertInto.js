const sql = require('../conf/postgresConf')

async function insertInto(data,table,columns) {
    await sql`
        insert into ${sql(table)} ${
        sql(data, columns)
    }
    `
}
module.exports = insertInto