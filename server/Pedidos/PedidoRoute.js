const express = require("express");
const routerPedido = express.Router();


// controller
const { getPedido, getProdutosPedidos, registerPedido, registerNovoItem, getUltimoPedido, getAllPedidos} = require("./PedidosController")


//rotas
routerPedido.post("/pedidos", getPedido);
routerPedido.post("/item/pedidos", getProdutosPedidos);
routerPedido.post("/pedidos/novoPedido",registerPedido)
routerPedido.post("/pedidos/novoItemPedido",registerNovoItem)
routerPedido.get("/pedidos/ultimo",getUltimoPedido)
routerPedido.get("/pedidos/all",getAllPedidos)



module.exports = routerPedido;