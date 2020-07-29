const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const MercadoriaVendida = sequelize.define('mercadoria_vendidas',{
    id_mercadoria:Sequelize.INTEGER,
    quantidade:Sequelize.INTEGER,
    notaId:{
        type:Sequelize.INTEGER,
        references:{
            model:'notas',
            key:'id'
        }
    }
})

MercadoriaVendida.sync({force:true})

module.exports = MercadoriaVendida;