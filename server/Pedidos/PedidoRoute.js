const express = require("express");
const routerPedido = express.Router();


// controller
const { getPedido, getProdutosPedidos, registerPedido, registerNovoItem, getUltimoPedido, getAllPedidos, getPedidoById} = require("./PedidosController")


//rotas
routerPedido.post("/pedidos", getPedido);
routerPedido.post("/item/pedidos", getProdutosPedidos);
routerPedido.post("/pedidos/novoPedido",registerPedido)
routerPedido.post("/pedidos/novoItemPedido",registerNovoItem)
routerPedido.get("/pedidos/ultimo",getUltimoPedido)
routerPedido.get("/pedidos/all",getAllPedidos)
routerPedido.get("/pedidos/:id",getPedidoById)



module.exports = routerPedido;