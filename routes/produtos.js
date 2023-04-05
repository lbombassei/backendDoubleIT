const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const secret = 'mysecretkey';
const path = require('path');
// Middleware para verificar o token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    jwt.verify(req.token, secret, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

// Rota para obter todos os produtos do usuário logado
router.get('/', verifyToken, (req, res) => {
  const userId = req.authData.id;
  fs.readFile('./data/produtos.json', 'utf8', (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const produtos = JSON.parse(data).produtos.filter(produto => produto.usuario_id === userId);
      res.json({ produtos });
    }
  });
});

// Rota para adicionar um novo produto
router.post('/', verifyToken, (req, res) => {
  const userId = req.authData.id;
  const { nome, descricao, preco, categoria, dataRemessa, imagem } = req.body;
  // const imagem = req.files ? req.files.imageBase64 : null;
  // console.log(req.body);
  // Validar os dados recebidos
  if (!nome || !descricao || !preco || !categoria || !dataRemessa ||!imagem) {
    res.status(400).json({ mensagem: 'Dados inválidos' });
    return;
  }

  // Ler o arquivo de produtos
  fs.readFile('./data/produtos.json', 'utf8', (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const produtos = JSON.parse(data).produtos;
      const novoProduto = {
        id: produtos.length + 1,
        usuario_id: userId,
        nome,
        descricao,
        preco,
        categoria,
        foto: imagem
      };

      // Adicionar o novo produto ao array de produtos
      produtos.push(novoProduto);

      // Salvar o arquivo de produtos
      fs.writeFile('./data/produtos.json', JSON.stringify({ produtos }), 'utf8', err => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.json({ produto: novoProduto });
        }
      });
    }
  });
});

router.put('/:id', verifyToken, (req, res) => {
  // Lê os dados do arquivo JSON
  const produtosFilePath = path.join(__dirname, '..', 'data', 'produtos.json');
  const produtosData = JSON.parse(fs.readFileSync('./data/produtos.json', 'utf8'));
  console.log(produtosFilePath)
  // Encontra o objeto do produto correspondente ao ID fornecido
  const produtoIndex = produtosData.produtos.findIndex(produto => produto.id === req.body.id);

  if (produtoIndex === "-1") {
  //  console.log(produtoIndex)
    return res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }else{
    // console.log(req.body)
    // Atualiza os campos do produto com os dados fornecidos na requisição
    const produtoAtualizado = {
      id: req.params.id,
      nome: req.body.nome,
      descricao: req.body.descricao,
      preco: req.body.preco,
      categoria: req.body.categoria,
      foto: req.body.foto,
      usuario_id: req.body.usuario_id
    };
    produtosData.produtos[produtoIndex] = produtoAtualizado;
  
    // Escreve os dados atualizados de volta no arquivo JSON
    fs.writeFileSync('./data/produtos.json', JSON.stringify(produtosData));
  
    // Retorna o produto atualizado
    return res.status(200).json(produtoAtualizado);
  }
 
});

// Rota para excluir um produto
router.delete('/:id', verifyToken, (req, res) => {
  // Implementar a lógica para excluir um produto
  try {
    const productId = req.params.id;
    console.log(productId)
    // Carrega o arquivo JSON na memória
    let produtos = JSON.parse(fs.readFileSync('./data/produtos.json', 'utf8'));
  
    // Procura pelo produto a ser excluído e remove-o do array
    produtos = produtos.produtos.filter((produto) => parseInt(produto.id) !== parseInt(productId));
    const produtosAtualizados = { produtos };
    // Sobrescreve o arquivo JSON com o novo array de produtos
    fs.writeFileSync('./data/produtos.json', JSON.stringify(produtosAtualizados));
  
    res.json({ mensagem: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o produto:', error);
    res.status(500).json({ mensagem: 'Erro ao excluir o produto' });
  }
});

module.exports = router;
