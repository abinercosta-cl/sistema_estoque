// 1. IMPORTAÇÔES - Trazemos as ferramentas para o nosso arquivo
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Importa o pool de conexões do arquivo db.js
const produtosRouter = require('./routes/produtos');

// 2. CONFIGURAÇÕES INICIAIS - Criamos nossa aplicação Express
const app = express();
const PORT = 3001; // Porta onde o servidor vai escutar por requisições 

// 3. MIDDLEWARES - São ajudantes que preparam nossa aplicação
app.use(cors()); // Habilita o cors para todas as rotas
app.use(express.json()); // Habilita o express para entender JSON no corpo das requisições

// 4. ROTAS - Aqui definimos os caminhos que nossa API vai ter

//rota principal raiz - um simples "ola mundo"
app.get('/', (req, res) => {
    res.send('Olá, mundo! A API está funcionando.');
})

// Rota para testar a conexão com o banco de dados
app.get('/test-db', async (req, res) => {
    try {
        //tenta fazer uma query simples no banco
        const { rows } = await pool.query('SELECT NOW()');
        // se der certo envia uma mensagem de sucesso
        res.status(200).json({
            message: 'conexão com o banco de dados bem sucedido',
            data: rows[0]
        });
    } catch (err) {
        // se der errado, envia uma mensagem de erro
        console.error('Erro ao conectar ao banco de dados:', err);
        res.status(500).json({
            message: 'Erro ao conectar ao banco de dados',
            error: err.message
        });
    }
})

app.use('/produtos', produtosRouter); // Conecta o roteador de produtos a aplicação

// 5. INICIANDO O SERVIDOR - Colocamos o servidor para escutar na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
// Agora, se você rodar "node index.js" no terminal, o servidor deve iniciar sem erros.

