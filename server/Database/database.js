const Sequelize = require("sequelize");
require('dotenv').config();
const connection = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: '-03:00'
});
module.exports = {
    connection,
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: true
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: true
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    }
};
module.exports = connection;