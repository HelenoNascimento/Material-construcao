const express = require("express");
const routerPedido = express.Router();


// controller
const { getPedido, getProdutosPedidos, registerPedido, registerNovoItem, getUltimoPedido, getAllPedidos, getPedidoById, getPedidoCliente, getUltimasVendas} = require("./PedidosController")


//rotas
routerPedido.post("/pedidos", getPedido);
//routerPedido.get("/pedidos",
routerPedido.post("/item/pedidos", getProdutosPedidos);
routerPedido.post("/pedidos/novoPedido",registerPedido)
routerPedido.post("/pedidos/novoItemPedido",registerNovoItem)
routerPedido.get("/pedidos/ultimo",getUltimoPedido)
routerPedido.get("/pedidos/getUltimosPedidos",getUltimasVendas);
routerPedido.get("/pedidos/all",getAllPedidos)
routerPedido.get("/pedidos/:id",getPedidoById)
routerPedido.post("/pedidos/getCliente",getPedidoCliente)




module.exports = routerPedido;