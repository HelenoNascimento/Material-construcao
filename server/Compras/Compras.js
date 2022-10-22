const Sequelize = require("sequelize");
const production = require("../Database/databaseold")

const Produto = require("../Produto/Produto")
const Fornecedor = require("../Fornecedor/Fornecedor")


const Compras =  production.define("compras",{

    total: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    data:{
        type: Sequelize.STRING,
        allowNull: false
    },
    data_entrega:{
        type: Sequelize.STRING,
        allowNull: false
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Compras.belongsTo(Fornecedor,{
    constraint: true,
    foreignKey: 'idFornecedor'
})

//Compras.sync({force: true});
Compras.sync();
module.exports = Compras;
//const connection = require("../Database/database")
