const express = require('express');
const bodyParser = require('body-parser');
const limiter = require('express-limiter')
const loginRoutes = require('./routes/login');
const productRoutes = require('./routes/produtos');
const cors = require('cors');

const app = express();

// Define o limite máximo de tamanho para o parser JSON
app.use(bodyParser.json({ limit: '50mb' }));

// Define o limite máximo de tamanho para o parser urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
// Configurações de middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.use('/api/login', loginRoutes);
app.use('/api/products', productRoutes);

// Porta em que a aplicação irá rodar
const port = process.env.PORT || 3000;

app.listen(port,'0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});