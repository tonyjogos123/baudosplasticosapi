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
        const vendas = await MercadoriaVendida.findAll({ where: { notaId: req.params.id } });
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
            notaId: req.body.notaId,
            desconto:req.body.desconto
        });
        res.json({ success: true ,venda:vendas});
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})

module.exports = router;