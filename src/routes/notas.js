const express = require('express');
const router = express.Router();
const login = require("../middleware/login");
const Nota = require('../models/Nota');
const MercadoriaVendida = require('../models/MercadoriaVendida');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Op = Sequelize.Op;
const pdf = require('html-pdf');
const fs = require('fs');

router.get('/:token', login, async (req, res) => {
    try {
        const notas = await Nota.findAll({where:{},order: [["data", "DESC"]]});
        res.json({ success: true, notas: notas });
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

router.post("/pdf", login, async (req, res) => {
    const documentoHtml = req.body.corpo;
    pdf.create(documentoHtml, {}).toFile("./uploads/pdfnota.pdf", (err, res) => {
        if (err) {
            console.log("Uma erro aconteceu")
        }
    })
    res.json({ success: true });
})

router.get('/:id/:token', login, async (req, res) => {
    try {
        const notas = await Nota.findOne({ where: { id: req.params.id } });
        res.json({ success: true, notas: notas });
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

router.get("/limite/:limite/:pulos/:token", login, async (req, res) => {
    try {
        const notas = await sequelize.query(`SELECT * FROM notas ORDER BY data DESC LIMIT ${req.params.limite} ` + `OFFSET ` + req.params.pulos);
        res.json({ success: true, notas: notas })
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

router.get('/:datainicial/:datafinal/:token', login, async (req, res) => {
    try {
        const notas = await Nota.findAll({ where: { data: { [Op.between]: [req.params.datainicial, req.params.datafinal] } }, order: [["data", "DESC"]] })
        res.json({ success: true, notas: notas })
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

router.post('/', login, async (req, res) => {
    try {
        const nota = await Nota.create({
            total: req.body.total,
            cliente: req.body.cliente
        });
        res.json(nota);
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

module.exports = router;