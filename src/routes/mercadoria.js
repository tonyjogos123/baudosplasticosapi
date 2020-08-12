const express = require('express');
const router = express.Router();
const Mercadoria = require('../models/Mercadoria');
const fs = require('fs');
const login = require('../middleware/login');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Op = Sequelize.Op;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage })

router.get('/:token', login, async (req, res) => {
    try {
        const mercadorias = await Mercadoria.findAll();
        res.json({ mercadorias: mercadorias, success: true })
    } catch (error) {
        res.json({ message: error.message, success: false })
    }
})

router.get('/:id/:token', login, async (req, res) => {
    try {
        const mercadoria = await Mercadoria.findOne({ where: { id: req.params.id } });
        res.json({ mercadoria: mercadoria, success: true })
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.get('/limite/:limite/:token', login, async (req, res) => {
    try {
        const mercadoria = await sequelize.query(`SELECT TOP ${req.params.limite} * FROM mercadorias ORDER BY nome DESC`);
        res.json({ mercadoria: mercadoria, success: true })
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.get('/busca/:nome/:token', login, async (req, res) => {
    try {
        const mercadoria = await Mercadoria.findAll({ where: { nome: { [Op.like]: req.params.nome + '%' } } });
        res.json({ mercadorias: mercadoria, success: true })
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.post('/', upload.single('img'), login, async (req, res) => {
    try {
        const precoCompraStr = req.body.precoCompra.replace(',', '.');
        const precoCompraFormated = parseFloat(precoCompraStr);
        const precoVendaStr = req.body.precoVenda.replace(',', '.');
        const precoVendaFormated = parseFloat(precoVendaStr);
        if (req.file) {
            const mercadoria = await Mercadoria.create({
                nome: req.body.nome,
                precoCompra: precoCompraFormated,
                precoVenda: precoVendaFormated,
                nomeImg: req.file.filename
            });
            
        } else {
            const mercadoria = await Mercadoria.create({
                nome: req.body.nome,
                precoCompra: precoCompraFormated,
                precoVenda: precoVendaFormated,
                nomeImg: ''
            });
            
        }
    } catch (error) {
        res.json({ message: error.message, success: false })
    }
})

router.post('/altera', upload.single('img'), login, async (req, res) => {
    try {
        const precoCompraStr = req.body.precoCompra.replace(',', '.');
        const precoCompraFormated = parseFloat(precoCompraStr);
        const precoVendaStr = req.body.precoVenda.replace(',', '.');
        const precoVendaFormated = parseFloat(precoVendaStr);
        if (req.file) {
            const path = 'uploads/' + req.body.nomeImg;
            const deleted = await fs.unlinkSync(path);
            const mercadoria = await Mercadoria.update({
                nome: req.body.nome,
                precoCompra: precoCompraFormated,
                precoVenda: precoVendaFormated,
                nomeImg: req.file.filename
            }, { where: { id: req.body.id } });
        } else {
            const mercadoria = await Mercadoria.update({
                nome: req.body.nome,
                precoCompra: precoCompraFormated,
                precoVenda: precoVendaFormated,
                nomeImg: req.body.nomeImg
            }, { where: { id: req.body.id } });
        }
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.delete('/:id', login, async (req, res) => {
    try {
        const mercadoria = await Mercadoria.findOne({ where: { id: req.params.id } });
        if (mercadoria.nomeImg) {
            const path = 'uploads/' + req.headers.nomeimg;
            const deleted = await fs.unlinkSync(path);
            const mercadoria = await Mercadoria.destroy({ where: { id: req.params.id } });
            res.json({ success: true })
        } else {
            const mercadoria = await Mercadoria.destroy({ where: { id: req.params.id } });
            res.json({ success: true })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
})

module.exports = router;