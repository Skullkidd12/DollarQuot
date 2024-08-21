const {Pool} = require('pg')
const pool = new Pool({
   host: 'db',
   port: 5432,
   user: 'postgres',
   password: 'root',
   database: 'ValorDolar'
})
pool.connect()
module.exports = pool





