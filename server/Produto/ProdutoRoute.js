const express = require("express");
const routerProdu = express.Router();


// controller
const { register } = require("./ProdutoController")



//rotas
routerProdu.post("/produto/register", register);

module.exports = routerProdu;
