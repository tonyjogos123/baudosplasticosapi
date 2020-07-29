const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Mercadoria = sequelize.define('mercadorias', {
    nome: Sequelize.STRING,
    precoCompra: Sequelize.DECIMAL(10, 2),
    precoVenda: Sequelize.DECIMAL(10, 2),
    nomeImg: Sequelize.STRING,
    data: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
})

Mercadoria.sync({ force: false })

module.exports = Mercadoria;