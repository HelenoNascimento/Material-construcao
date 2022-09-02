const Sequelize = require("sequelize");
const connection = require("../Database/database")


const Cliente = connection.define("cliente",{

    nome:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    }

})

//Cliente.sync({force: true});

module.exports = Cliente;