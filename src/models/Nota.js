const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Admin = require('./Admin');
const MercadoriaVendida = require('./MercadoriaVendida');

const Nota = sequelize.define('notas', {
    total: Sequelize.FLOAT,
    data: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
})

Nota.hasMany(MercadoriaVendida);

Nota.sync({ force: true })

module.exports = Nota;