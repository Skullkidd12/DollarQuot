
const checkDateExists = "SELECT COUNT(1) FROM cotacaodolar WHERE datacotacao = $1";
const getValorDb = "SELECT valorcotacao FROM cotacaodolar WHERE datacotacao = $1";
const insertDB = "INSERT INTO cotacaodolar (datacotacao,valorcotacao) VALUES ($1, $2)"

module.exports = {
   checkDateExists,
   getValorDb,
   insertDB 
}
