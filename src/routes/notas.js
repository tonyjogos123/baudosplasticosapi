const express = require('express');
const router = express.Router();
const login = require("../middleware/login");
const Nota = require('../models/Nota');
const MercadoriaVendida = require('../models/MercadoriaVendida');

router.get('/:token',login,async(req,res) => {
    try {
        const notas = await Nota.findAll();
        res.json({success:true,notas:notas});
    } catch (error) {
        res.json({success: false,erro:error.message})
    }
})

router.post('/',login,(req,res) => {
    try {
        const nota = await Nota.create({
            total:req.body.total
        });
        res.json(nota);
    } catch (error) {
        res.json({success: false,erro:error.message})
    }
})

module.exports = router;