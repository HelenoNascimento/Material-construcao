const Sequelize = require("sequelize");
const connection = require("../Database/database")


const Fornecedor = connection.define("fornecedor",{

    nome:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull: false
    },
   
})
//Fornecedor.sync({force: true});

module.exports = Fornecedor;