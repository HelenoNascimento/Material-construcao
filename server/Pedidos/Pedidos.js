const Sequelize = require("sequelize");
const production = require("../Database/database")
//const Fornecedor = require("../Fornecedor/Fornecedor");
const Produto = require("../Produto/Produto")
const Cliente = require("../Cliente/Cliente")


const Pedidos = production.define("pedidos",{

    
    total:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    data:{
        type: Sequelize.STRING,
        allowNull: false
    },

})

Pedidos.belongsTo(Cliente,{
    constraint: true,
    foreignKey: 'idCliente'
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
//Fornecedor.hasMany(Produto) //um fornecedor tem muitos produtos
//Produto.belongsTo(Fornecedor) //um Produto tem um fornecedor
//Pedidos.sync({force: true});
//connection.sync()

//connection.sync()
module.exports = Pedidos;
//module.exports = Produto;