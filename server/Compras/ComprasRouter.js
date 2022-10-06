const express = require("express");
const routerCompra = express.Router();

const { getAllCompras, novaCompra, novoItemCompra, getUltimaCompra, getUltimasCompras, getCompraById, recebeProduto, getComprasPendentes } = require("./ComprasController");


//rotas
routerCompra.get("/compras",getAllCompras)
routerCompra.post("/compras/novaCompra",novaCompra)
routerCompra.post("/compras/recebeProduto",recebeProduto)
routerCompra.post("/compras/novoItemCompra",novoItemCompra)
routerCompra.get("/compras/pendente",getComprasPendentes)
routerCompra.get("/compras/ultimaCompra",getUltimaCompra)
routerCompra.get("/compras/ultimasCompras",getUltimasCompras)
routerCompra.get("/compra/:id",getCompraById)





module.exports = routerCompra;