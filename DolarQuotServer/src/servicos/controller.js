const pool = require('../db/db');
const { checkDateExists, getValorDb, insertDB } = require('../queries/queries');
const axios = require('axios');
async function checadb(data){
   const verTudo = await pool.query(checkDateExists,[data]);
   return verTudo.rows[0].count
}

const pegaValorAPI = async (data) => {
   try {
      const d = new Date(data);
      let yyyy = d.getFullYear();
      let mm = d.getMonth() + 1;
      let dd = d.getDate() + 1;
      const response = await axios.get(
         `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${mm}-${dd}-${yyyy}%27&$top=100&$format=json`
      );
      const resultado = response.data.value[0].cotacaoCompra
      return resultado;
   } catch (error) {
      console.error('Não foi possível obter o valor neste dia, tente outro');
   }
};

async function pegaValorDb(data){
   const valorDolarDB = await pool.query(getValorDb,[data]);
   const resultado = valorDolarDB.rows[0].valorcotacao
   return Number(resultado)
}

async function insereNaDB(data,resultadoAPI) {
   await pool.query(insertDB,[data,resultadoAPI],(err, res) => {
     if (err){
      return console.error('erro ao inserir dados'+ err.stack)
     }
     console.log('dados inseridos com sucesso', res)
   });
}

const mainFunc = async (req, res) => {
   try{
      const data = req.body.description;
      console.log(data);
      const existeNaDb = await checadb(data);
      if(existeNaDb == 1){
         let resultadoDB = await pegaValorDb(data);
         console.log(`Resultado encontrado na db: ${resultadoDB}`);
         res.send(resultadoDB.toString());
      }else{
         let resultadoAPI = await pegaValorAPI(data);
         if(resultadoAPI === undefined){
            console.log('nao foi possível obter valor');
            return res.send(500);
         }
         console.log(`Resultado encontrado na API: ${resultadoAPI}`);
         insereNaDB(data,resultadoAPI);
         res.send(resultadoAPI.toString());
      }
      
   } catch (err) {
      console.error(err);
      res.sendStatus(500)
   } 
} 

module.exports = {
   checadb,
   pegaValorAPI,
   pegaValorDb,
   insereNaDB,
   mainFunc
}