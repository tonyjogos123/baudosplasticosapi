const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Admin = require('./Admin');
const MercadoriaVendida = require('./MercadoriaVendida');

const Nota = sequelize.define('notas', {
    total: Sequelize.FLOAT,
    data: { type: Sequelize.STRING, allowNull: false, defaultValue: Sequelize.NOW() }
})

Nota.hasMany(MercadoriaVendida);

Nota.sync({ force: false })

module.exports = Nota;