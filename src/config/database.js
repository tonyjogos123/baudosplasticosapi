const Sequelize = require('sequelize');

const sequelize = new Sequelize('heroku_5bcb46126675de9','b148c18bfd1f4e','478ebbf4',{
    host:'us-cdbr-east-03.cleardb.com',
    dialect:'mysql',
    raw:true,
    define: {
        timestamps: false
    }
});

module.exports = sequelize;
