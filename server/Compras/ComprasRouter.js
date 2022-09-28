const express = require("express");
const routerCompra = express.Router();

const { getAllCompras, novaCompra, novoItemCompra, getUltimaCompra } = require("./ComprasController");


//rotas
routerCompra.get("/compras",getAllCompras)
routerCompra.post("/compras/novaCompra",novaCompra)
routerCompra.post("/compras/novoItemCompra",novoItemCompra)
routerCompra.get("/compras/ultimaCompra",getUltimaCompra)



module.exports = routerCompra;