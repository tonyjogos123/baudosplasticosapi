const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Admin = require('./Admin');
const MercadoriaVendida = require('./MercadoriaVendida');
const d = new Date();

const Nota = sequelize.define('notas', {
    total: Sequelize.FLOAT,
    data: { type: Sequelize.DATE, defaultValue: Date.now() }
})

Nota.hasMany(MercadoriaVendida);

Nota.sync({ force: false })

module.exports = Nota;