const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/auth');

const fixedUser = {
  id: 1,
  email: 'admin@teste.com',
  senha: '$2a$04$uyL6iXOjSb8JFLDWiIzad.Y7X0.o2UK92IOU81ZFK3xUAunw96w/K', // 1234
  nome: 'Administrador'
}

// Rota para autenticar um usuário
router.post('/', (req, res) => {
  const { email, senha } = req.body;

  if (email === fixedUser.email) {
    bcrypt.compare(senha, fixedUser.senha, (err, result) => {
      if (err || !result) {
        res.status(401).send('Usuário ou senha incorretos');
      } else {
        const token = generateToken({ id: fixedUser.id, nome: fixedUser.nome });
        res.json({ token, user: { nome: fixedUser.nome } });
      }
    });
  } else {
    res.status(401).send('Usuário ou senha incorretos');
  }
});

module.exports = router;