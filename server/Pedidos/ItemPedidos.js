const Sequelize = require("sequelize");
const connection = require("../Database/database")
//const Fornecedor = require("../Fornecedor/Fornecedor");
const Produto = require("../Produto/Produto")

//connection.sync()
const ItemPedidos = connection.define("ItemPedidos",{
    quantidade:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    valor_item:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    
  
})

//connection.sync()
//Fornecedor.hasMany(Produto) //um fornecedor tem muitos produtos
//Produto.belongsTo(Fornecedor) //um Produto tem um fornecedor/
//ItemPedidos.sync({force: true});
connection.sync()
module.exports = ItemPedidos;