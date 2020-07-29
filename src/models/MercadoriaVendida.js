const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const MercadoriaVendida = sequelize.define('mercadoria_vendida',{
    id_mercadoria:Sequelize.INTEGER,
    quantidade:Sequelize.INTEGER
})

MercadoriaVendida.sync({force:true})

module.exports = MercadoriaVendida;