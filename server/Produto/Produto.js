const Sequelize = require("sequelize");
const connection = require("../Database/database")
const Fornecedor = require("../Fornecedor/Fornecedor");
const ItemPedidos = require("../Pedidos/ItemPedidos");
//const itemPedido = require("../Pedidos/ItemPedidos");
//const itemPedidos = require("../Pedidos/ItemPedidos");
//const Pedidos = require("../Pedidos/pedidos");
//const Pedidos = require("../Pedidos/Pedidos")
//const Pedidos = require("../Pedidos/pedidos")
const Pedidos = require("../Pedidos/pedidos")

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
        type: Sequelize.FLOAT,
        allowNull: false
    },
    valor:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    

})
Produto.belongsTo(Fornecedor,{
    constraint: true,
    foreignKey: 'idFornecedor'
})

Fornecedor.hasMany(Produto,{
    foreignKey: 'idFornecedor'
})
Produto.belongsToMany(Pedidos,{
    through:{
        model: ItemPedidos
    },
    foreignKey: 'idProduto',
    constraints: true
})


Pedidos.belongsToMany(Produto,{
    through:{
        model: ItemPedidos
    },
    foreignKey: "idPedido",
   constraint: true
})


//Fornecedor.hasMany(Produto) //um fornecedor tem muitos produtos
//Produto.belongsTo(Fornecedor) //um Produto tem um fornecedor
//Produto.sync({force: true});
//connection.sync()
module.exports = Produto;
