const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

router.post("/",async(req,res) => {
    try {
        const admin = await Admin.findOne({where:{usuario:req.body.usuario}});
        if(admin){
            const isPassword = bcrypt.compareSync(req.body.senha,admin.senha);
            if(isPassword){
                const token = jwt.sign({id:admin.id,usuario:admin.usuario},process.env.SECRET_KEY,{expiresIn:'24h'});
                res.json({id:admin.id,token:token,success:true});
            }else{
                res.json({message:'Senha invalida',success:false})
            }
        }else{
            res.json({message:'Admin nao esta cadastrado',success:false})
        }
    } catch (error) {
        res.json({message:error.message});
    }
})

module.exports = router;