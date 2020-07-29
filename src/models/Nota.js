const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Admin = require('./Admin');
const MercadoriaVendida = require('./MercadoriaVendida');

const Nota = sequelize.define('notas', {
    total: Sequelize.FLOAT,
    data: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
})

Nota.sync({ force: true })

Nota.hasMany(MercadoriaVendida,{foreignKey:'notaId'});

module.exports = Nota;