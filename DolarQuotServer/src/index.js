const express = require('express');
const app = express();
const rotas = require('./rotas/routes')
app.use('/',rotas)
app.use((req, res, next) => {
   console.log(`${req.method}:${req.url}`);
   next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Servidor rodando na porta ${port}`);
});

