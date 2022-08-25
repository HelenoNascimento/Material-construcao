const express = require("express");
const routerProdu = express.Router();


// controller
const { register, getProdutos } = require("./ProdutoController")

// midleware
const {produtoCreateValidation } = require("./ProdutoValidations");

//rotas
routerProdu.post("/produto/register",produtoCreateValidation(), register);
routerProdu.get("/produto",getProdutos);

module.exports = routerProdu;
