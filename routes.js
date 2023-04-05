const express = require('express');
const router = express.Router();

const loginRouter = require('./login');
const productsRouter = require('./products');

// Definir as rotas para o login
router.use('/api/login', loginRouter);

// Definir as rotas para os produtos
router.use('/api/products', productsRouter);

module.exports = router;
