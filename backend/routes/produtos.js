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

// Rota para atualizar um produto existente - UPDATE
// PUT http://localhost:3001/produtos/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params; //pega o ID da URL
    const { nome, codigo_barras, preco_venda, preco_custo, quantidade_estoque } = req.body; //pega os dados do corpo da requisição

    //validação
    if (!nome || !codigo_barras || !preco_venda || !preco_custo || !quantidade_estoque) {
        return res.status(400).json({ error: 'Nome, código de barras, preço de vendas, preço de custo e quantidade em estoque são obrigatórios' });
    }
    try {
        const updatedProduct = await pool.query(
            'UPDATE produtos SET nome=$1, codigo_barras=$2, preco_venda=$3, preco_custo=$4, quantidade_estoque=$5 WHERE id=$6 RETURNING *',
            [nome, codigo_barras, preco_venda, preco_custo, quantidade_estoque, id]
        );

        //Verificar se o produto foi encontrado e atualizado
        if (updatedProduct.rows.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(updatedProduct.rows[0]);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ error: "Codigo de barras já cadastrado." });
        }
        res.status(500).json({ error: error.message });
    }
});

// Rota para deletar um produto - DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params; //pega o ID da URL

    try {
        const deletedProduct = await.pool.query(
            'DELETE FROM produtos WHERE id=$1 RETURNING *',
            [id]
        );
        //Verificar se o produto foi encontrado e deletado
        if (deletedProduct.rowsCount === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
// Agora, podemos usar esse roteador no nosso arquivo principal index.js
