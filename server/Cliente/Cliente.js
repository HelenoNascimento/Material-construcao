const Sequelize = require("sequelize");
const production = require("../Database/database")
const itemPedidos = require("../Pedidos/ItemPedidos");
const Pedidos = require("../Pedidos/pedidos");

const Cliente = production.define("cliente",{

    nome:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade:{
        type: Sequelize.STRING,
        allowNull: true
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
//Cliente.sync();
module.exports = Cliente;