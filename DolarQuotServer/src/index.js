const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const axios = require('axios');
const pool = require('./db');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.json());

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

app.post('/data', (req, res) => {
   let [dd, mm, aaaa] = passarData(req);
   pegarDolar(dd, mm, aaaa);
   console.log(mm);
   res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Servidor rodando na porta ${port}`);
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
app.post('/testepost', async (req, res)=>{
   const { name, location} = req.body
   try{
      await pool.query('INSERT INTO schools(name,address) VALUES ($1, $2', [name, location]);
      res.status(200).send({message: "successfully added child"})
   }catch (err){
      console.log(err)
      req.sendStatus(500)
   }
   
})

app.get('/setup', async (req, res) => {
   try{
      await pool.query('CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))');
      res.status(200).send({message: "successfully created table"})
   }catch (err){
      console.log(err)
      res.sendStatus(500)
   }
})

//https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%2707-03-2023%27&$top=100&$format=json

//https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${dd}-${mm}-${aaaa}%27&$top=100&$format=json

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
