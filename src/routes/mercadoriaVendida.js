const express = require('express');
const router = express.Router();
const MercadoriaVendida = require('../models/MercadoriaVendida');
const login = require('../middleware/login');

router.get('/:token', login, async (req, res) => {
    try {
        const vendas = await MercadoriaVendida.findAll();
        res.json({ success: true, vendas: vendas })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})

router.get('/:id/:token', login, async (req, res) => {
    try {
        const vendas = await MercadoriaVendida.findAll({ where: { id: req.params.id } });
        res.json({ success: true, vendas: vendas })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})

router.post('/', login, async (req, res) => {
    try {
        const vendas = await MercadoriaVendida.create({
            id_mercadoria: req.body.id_mercadoria,
            quantidade: req.body.quantidade,
            id_nota: req.body.id_nota
        });
        res.json({ success: true, s })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})

module.exports = router;