const Sequelize = require("sequelize");

const dbUser = process.env.DB_USER;

const connection = new Sequelize('materialconstrucao','root', '7744123',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;