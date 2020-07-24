const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt-nodejs');

router.post("/",async(req,res) => {
    try {
        const admin = await Admin.findOne({where:{usuario:req.body.usuario}});
        if(!admin){
            const hash = bcrypt.hashSync(req.body.senha)
            const createAdmin = await Admin.create({
                nome:req.body.nome,
                usuario:req.body.usuario,
                senha:hash
            });
            res.json({admin:createAdmin});
        }else{
            res.json({message:'Admin ja cadastrado'})
        }
    } catch (error) {
        res.json({message:error.message});
    }
})

module.exports = router;