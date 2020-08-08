const express = require('express');
const router = express.Router();
const login = require("../middleware/login");
const Nota = require('../models/Nota');
const MercadoriaVendida = require('../models/MercadoriaVendida');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const pdf = require('html-pdf');
const fs = require('fs');

router.get('/:token', login, async (req, res) => {
    try {
        const notas = await Nota.findAll();
        res.json({ success: true, notas: notas });
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

router.post("/pdf",login,(req,res) => {
    const documentoHtml = req.body.corpo;
    console.log(documentoHtml);
})

router.get('/:id/:token', login, async (req, res) => {
    try {
        const notas = await Nota.findOne({ where: { id: req.params.id } });
        res.json({ success: true, notas: notas });
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

router.get("/limite/:limite/:token", async (req, res) => {
    try {
        const notas = await Nota.findAll();
        res.json({ success: true, notas: notas })
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

router.get('/:datainicial/:datafinal/:token', login, async (req, res) => {
    try {
        const notas = await Nota.findAll({ where: { data: { [Op.between]: [req.params.datainicial, req.params.datafinal] } } })
        res.json({ success: true, notas: notas })
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

router.post('/', login, async (req, res) => {
    try {
        const nota = await Nota.create({
            total: req.body.total
        });
        res.json(nota);
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

module.exports = router;