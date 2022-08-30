const Sequelize = require("sequelize");
const connection = require("../Database/database")
const Fornecedor = require("../Fornecedor/Fornecedor");

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

//Fornecedor.hasMany(Produto) //um fornecedor tem muitos produtos
//Produto.belongsTo(Fornecedor) //um Produto tem um fornecedor
//Produto.sync({force: true});

module.exports = Produto;
