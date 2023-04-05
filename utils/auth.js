const jwt = require('jsonwebtoken');

const secret = 'mysecretkey';

function generateToken(user) {
  const payload = {
    id: user.id,
    name: user.nome,
    userId: user.userId // adicione aqui
  };
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

module.exports = {
  generateToken
};