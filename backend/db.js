const { Pool } = require('pg');

// Configura o 'pool' de conexões com o PostgreSQL
const pool = new Pool({
    user: 'postgres',                 // Seu usuário do Postgres (geralmente 'postgres')
    host: 'localhost',                // O endereço do servidor do banco
    database: 'loja_estoque',         // O nome do banco de dados que criamos
    password: '1411',                 // A senha definida na instalação!
    port: 5432,                       // A porta padrão do PostgreSQL
});

// Exporta o 'pool' para que outros arquivos possam usá-lo para fazer queries
module.exports = pool;