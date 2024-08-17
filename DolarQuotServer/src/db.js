const {Client} = require('pg')
const client = new Client({
   host: 'localhost',
   port: 5432,
   user: 'postgres',
   password: '1234',
   database: 'BANCOTESTE'
})

client.connect();

client.query(`INSERT INTO "DOLARCOTACAO" (date, valorcompra) VALUES ($1, $2)`,['1997-03-12','1.2345'], (err, res) => {
   if(res){
      console.log(res.rows)
   }else{
      console.log(err)
   }
   client.end()
})
