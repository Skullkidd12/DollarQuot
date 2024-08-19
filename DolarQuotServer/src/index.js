const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const {Client} = require('pg');
const axios = require('axios');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.json());

const client = new Client({
   host: 'localhost',
   port: 5432,
   user: 'postgres',
   password: '1234',
   database: 'teste1'
})
client.connect();
app.use((req, res, next) => {
   console.log(`${req.method}:${req.url}`);
   next();
});

function passarData(req) {
   let data = req.body.date;
   const d = new Date(data);
   let ano = d.getFullYear();
   let mes = d.getMonth() + 1;
   let dia = d.getDate() + 1;
   return [dia.toString(), mes.toString(), ano.toString()];
}

async function checkDB(dd, mm ,aaaa){
   let date = `${aaaa}-${mm}-${dd}`
   client.query('SELECT EXISTS (SELECT 1 FROM dollarvalue WHERE value = ?) AS value_exists', [date], (err, results) => {
      if (err) {
          return console.error('Erro ao executar a query: ' + err.stack);
      }
      
      if (results[0].value_exists) {
          console.log('O valor existe na tabela.');
      } else {
          console.log('O valor não existe na tabela.');
      }
  });
   
}

app.post('/data', (req, res) => {
   let [dd, mm, aaaa] = passarData(req);
   checkDB(dd,mm,aaaa);
   pegarDolar(dd, mm, aaaa);

   console.log(mm);
   res.sendStatus(200);
});

app.get('/testeget', async (req, res)=>{
   try{
      await pool.query('SELECT * FROM schools');
      res.status(200).send(data.rows)
   }catch (err){
      console.log(err)
      req.sendStatus(500)
   }
   
})
app.post('/testepost1', async (req, res)=>{
   try{
      await client.query('INSERT INTO dollarvalue (date,value) VALUES ($1, $2)', ['1997-12-12', 5.4565]);
      res.status(200).send({message: "successfully added child"})
   }catch (err){
      console.log(err)
      res.sendStatus(500)
   }
   
})





const pegarDolar = async (dd, mm, yyyy) => {
   try {
      const response = await axios.get(
         `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${mm}-${dd}-${yyyy}%27&$top=100&$format=json`
      );
      console.log('API Response:', response.data.value[0].cotacaoCompra);
   } catch (error) {
      console.error('Error calling API:', error);
   }
};

//formato data na url
//mm - dd - yyyy


//https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%2707-03-2023%27&$top=100&$format=json

//https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${dd}-${mm}-${aaaa}%27&$top=100&$format=json


const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Servidor rodando na porta ${port}`);
});

checkDB('29','04','2005')