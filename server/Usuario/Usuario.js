const Sequelize = require("sequelize");
const connection = require("../Database/database");

const Usuario = connection.define("Usuario",{
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