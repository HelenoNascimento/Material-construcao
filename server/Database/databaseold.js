const Sequelize = require("sequelize");
require('dotenv').config();

const dbUser = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;


const connection = new Sequelize(process.env.DB_NAME,process.env.DB_USER, DB_PASS,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: '-03:00'
});

module.exports = connection;