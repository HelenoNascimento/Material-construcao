const Sequelize = require("sequelize");
const production = require("../Database/database")
//const Fornecedor = require("../Fornecedor/Fornecedor");
const Produto = require("../Produto/Produto")


const ItemCompra =  production.define("ItemCompra",{

    quantidade: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    valor_item:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
    
});

//ItemCompra.sync({force: true});
//connection.sync()
module.exports = ItemCompra;