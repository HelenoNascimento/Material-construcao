const Sequelize = require("sequelize");
const connection = require("../Database/database")


const Produto = connection.define("Produto",{

    nome:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.STRING,
        allowNull: false
    },
    fornecedor:{
        type: Sequelize.STRING,
        allowNull: false
    }

})
//Produto.sync({force: true});

module.exports = Produto;
