// app.js

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/register');

const app = express();

app.use(bodyParser.json());

// Rota para registrar um novo usuário
app.use('/register', router);

app.listen(3000, () => console.log('Servidor iniciado na porta 3000.'));
