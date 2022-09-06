const Sequelize = require("sequelize");
const connection = require("../Database/database")
const itemPedidos = require("../Pedidos/ItemPedidos");
const Pedidos = require("../Pedidos/pedidos");

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



/*
Produto.belongsTo(Fornecedor,{
    constraint: true,
    foreignKey: 'idFornecedor'
})

Fornecedor.hasMany(Produto,{
    foreignKey: 'idFornecedor'
})
*/

//Cliente.sync({force: true});

module.exports = Cliente;