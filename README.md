# Backend
Esse é o repositório do backend de um sistema de gerenciamento de produtos, desenvolvido com Node.js e Express.
# Como Executar
Certifique-se de ter o Node.js(v18.15.0) e o npm(v9.6.3) instalado na sua máquina.
Faça o clone deste repositório na sua máquina.
Acesse o diretório do projeto via terminal e execute o comando  `npm install`
Execute o comando `npm start` para iniciar o servidor.
O servidor será executado em <http://localhost:3000/>
# Arquivo JSON
O sistema utiliza um arquivo JSON para armazenar os dados dos produtos. Esse arquivo é carregado na memória quando o servidor é iniciado e atualizado sempre que um produto é criado, atualizado ou excluído.
# Endpoints:
1. /login 
    /POST:  autentica um usuário com e-mail e senha e retorna um token JWT.
2. /products
    1. GET /produtos: retorna uma lista com todos os produtos.
    2. POST /produtos: cria um novo produto com nome, descrição e preço.
    3. PUT /produtos/:id: atualiza um produto pelo seu ID.
    4. DELETE /produtos/:id: exclui um produto pelo seu ID.
# Autor: 
### Leonardo Bombassei.