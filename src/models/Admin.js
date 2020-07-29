const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Nota = require('./Nota');

const Admin = sequelize.define('admins',{
    nome:Sequelize.STRING,
    usuario:Sequelize.STRING,
    senha:Sequelize.STRING
})

Admin.sync({force:false})

module.exports = Admin;