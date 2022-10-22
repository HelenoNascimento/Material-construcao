const Sequelize = require("sequelize");
const production = require("../Database/database");

const Usuario = production.define("Usuario",{
    nome:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Usuario;