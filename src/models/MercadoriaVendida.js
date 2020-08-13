const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const MercadoriaVendida = sequelize.define('mercadoria_vendidas', {
    id_mercadoria: Sequelize.INTEGER,
    quantidade: {type:Sequelize.INTEGER,allowNull: false,defaultValue: 0.00},
    desconto:Sequelize.FLOAT,
    notaId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'notas',
            key: 'id'
        }
    }
})

MercadoriaVendida.sync({ force: false })

module.exports = MercadoriaVendida;