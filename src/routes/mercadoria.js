const express = require('express');
const router = express.Router();
const Mercadoria = require('../models/Mercadoria');
const fs = require('fs');
const login = require('../middleware/login');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
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
        res.json({ message: error.message })
    }
})

router.get('/:nome/:token', login, async (req, res) => {
    try {
        const mercadorias = await Mercadoria.findAll({ where: { nome: { [Op.like]: req.params.nome + '%' } } });
        res.json({ mercadorias: mercadorias, success: true })
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
        const mercadoria = await Mercadoria.create({
            nome: req.body.nome,
            precoCompra: precoCompraFormated,
            precoVenda: precoVendaFormated,
            nomeImg: req.file.filename
        });
    } catch (error) {
        res.json({ message: error.message, success: false })
    }
})

router.put('/', login, async (req, res) => {
    try {
        const mercadoria = await Mercadoria.update({
            nome: req.body.nome,
            precoCompra: req.body.precoCompra,
            precoVenda: req.body.precoVenda,
        }, { where: { id: req.body.id } });
        res.json({ mercadoria: mercadoria, success: true });
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.delete('/:id', login, async (req, res) => {
    try {
        const path = 'uploads/' + req.headers.nomeimg;
        fs.unlink(path, async (err) => {
            if (err) {
                console.error(err)
                res.json({success: false})
            }else{
                const mercadoria = await Mercadoria.destroy({ where: { id: req.params.id } });
                res.json({ success: true })
            }
        })
        
    } catch (error) {
        res.json({ message: error.message })
    }
})

module.exports = router;