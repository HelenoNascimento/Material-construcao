const express = require("express");
const routerPedido = express.Router();


// controller
const { getPedido, getProdutosPedidos, registerPedido, registerNovoItem} = require("./PedidosController")


//rotas
routerPedido.post("/pedidos", getPedido);
routerPedido.post("/item/pedidos", getProdutosPedidos);
routerPedido.post("/pedidos/novoPedido",registerPedido)
routerPedido.post("/pedidos/novoItemPedido",registerNovoItem)



module.exports = routerPedido;