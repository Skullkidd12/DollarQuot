## DollarQuot1.0
>Esta é uma aplicação simples que busca os valores de compra do Dolar Comercial em datas específicas e mostra para o usuário na forma de cards. 
O algoritmo checa uma Database pelo valor na data pedida pelo usuário, caso o valor não exista na db ele busca diretamente da API do banco central e os insere logo em seguida na mesma. 

O backend foi feito com **node.js** e **PostgreSQL**.
![image](https://github.com/user-attachments/assets/b608b91f-b77f-4589-a2fd-daa31409ffdd)

O frontend foi feito com **react**.
![image](https://github.com/user-attachments/assets/e66fc6af-e934-48c6-8219-fbba410f0124)

## 🚀 Tecnologias usadas

- Vitejs

- Node.js

- Chakra UI + FramerMotion

- PostgresSQL

- React
- Express

Para instalar dependências e rodar o Frontend, insira os comandos no terminal no diretorio:
```bash
npm install
npm run dev
```
Depois disso:
```bash
open http://127.0.0.1:5173
```
Para realizar o docker compose do Backend, insira os comandos no terminal no diretorio:
```bash
docker build -t dolar-quot-server .
docker-compose up  
```
Depois disso:
```bash
open http://127.0.0.1:3000
```

### ESTE É UM TRABALHO EM PROGRESSO 

