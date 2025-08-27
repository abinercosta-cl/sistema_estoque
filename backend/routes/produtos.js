const express = require('express');
const router = express.Router();
const pool = require('../db'); // Importa o pool de conexões do arquivo db.js

//rota para Ler/Listar todos os produtos
touter.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM produtos ORDER BY nome ASC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

