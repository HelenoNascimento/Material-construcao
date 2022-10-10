const express = require('express');
const app = express();
const connection = require("./Database/database")
const cors =require("cors");

const Pedidos = require("./Pedidos/Pedidos")
const Compras = require("./Compras/Compras")
const ItemPedidos = require("./Pedidos/ItemPedidos")
const Produto = require("./Produto/Produto")
const Clientes = require("./Cliente/Cliente")

    // config JSON form data response
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
//connection.sync()

     // routes
    const routerProdu = require("./Produto/ProdutoRoute.js");
    const routerForne = require("./Fornecedor/FornecedorRoute");
    const routerClient = require("./Cliente/ClienteRoute");
    const routerPedido = require("./Pedidos/PedidoRoute")
    const routerCompra = require("./Compras/ComprasRouter");
const Cliente = require('./Cliente/Cliente');
    
    app.use(routerCompra);
    app.use(routerClient);
    app.use(routerProdu);
    app.use(routerForne);
    app.use(routerPedido);

    app.get("/",(req, res)=>{
        res.send("ola")
    })
    /*
    Produto.belongsToMany(Pedidos, { through: ItemPedidos });
    Pedidos.belongsToMany(Produto, { through: ItemPedidos });
    Pedidos.belongsTo(Clientes,{
        constraint: true,
        foreignKey: 'idCliente'
    })*/
    const cliente = Clientes.findByPk(1)
   /* const pedido =  Pedidos.create({
        total: "200",
        data: "21/05/2014",
        idCliente: cliente.id
    });*/

/*
     Pedidos.create({
        data: "21/05/2014",
        idCliente: "2",
        total: "2",
       
    })*/
 /*
    ItemPedidos.create({
        idProduto: "9",
        idPedido: "2",
        quantidade: "2",
        valor_item: "100"
    })
*/
   // Pedidos.create({ data: "21/05/2014"});
/*
ItemPedidos.create({
        idProduto: "2",
        idPedido: "2",
        idClient: "2"
    })

*//*
const pedidos = Pedidos.findByPk(1,{
    include:  Cliente
});
*/
//console.log(pedidos)

//database
//connection.sync()
//connection.sync({force: true});
connection.sync()
connection
    .authenticate()
    .then(() =>{
        console.log("Conexão feita com sucesso!")
    }).catch((error) =>{
        console.log(error);
    })

    connection.sync()
 

app.listen(3001, () =>{

    console.log('servidor rodando na porta 3001');
});

