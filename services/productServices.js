const jwt = require('jsonwebtoken');
const products = require('../data/produtos.json');

const secret = 'sua-chave-secreta-aqui'; // Substitua pela sua chave secreta

function getProductsByUserId(userId) {
  const decodedToken = jwt.decode(userId);
  const userProducts = products.filter(p => p.userId === decodedToken.id);
  return userProducts;
}

module.exports = {
  getProductsByUserId,
};