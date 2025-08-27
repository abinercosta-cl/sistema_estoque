const express = require('express');
const router = express.Router();
const pool = require('../db'); // Importa o pool de conexões do arquivo db.js

//rota para Ler/Listar todos os produtos
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM produtos ORDER BY nome ASC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

//Rota para criar um novo produto - CREATE
// POST http://localhost:3001  /produtos

router.post('/', async (req, res) => {
    const { nome, codigo_barras, preco_venda, preco_custo, quantidade_estoque } = req.body;

    if (!nome || !codigo_barras || !preco_venda || !preco_custo || !quantidade_estoque) {
        return res.status(400).json({ error: 'Nome, código de barras e preço de vendas são obrigatórios' });
    }
    try {
        const newProduct = await pool.query(
            'INSERT INTO produtos (nome, codigo_barras, preco_venda, preco_custo, quantidade_estoque) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nome, codigo_barras, preco_venda, preco_custo, quantidade_estoque]
        );
        res.status(201).json(newProduct.rows[0]);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ error: 'Código de barras já existe. Deve ser único.' });
        }
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
// Agora, podemos usar esse roteador no nosso arquivo principal index.js
