const express = require('express');
const router = express.Router();
const login = require("../middleware/login");
const Nota = require('../models/Nota');
const MercadoriaVendida = require('../models/MercadoriaVendida');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/:token', login, async (req, res) => {
    try {
        const notas = await Nota.findAll();
        res.json({ success: true, notas: notas });
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

router.get("/limite/:limit/:token", async (req, res) => {
    try {
        const notas = await Sequelize.query("SELECT id,total,data FROM notas LIMIT " + req.params.limit);
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