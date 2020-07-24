const Sequelize = require('sequelize');

const sequelize = new Sequelize('tiranotaapidb','adminbdpapi','55425610a',{
    host:'mysql669.umbler.com:41890',
    dialect:'mysql',
    raw:true,
    define: {
        timestamps: false
    }
});

module.exports = sequelize;