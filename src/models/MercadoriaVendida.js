const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const MercadoriaVendida = sequelize.define('mercadoria_vendida',{
    id_mercadoria:Sequelize.INTEGER,
    quantidade:Sequelize.INTEGER,
    id_nota:Sequelize.INTEGER
})

MercadoriaVendida.sync({force:false})

module.exports = MercadoriaVendida;