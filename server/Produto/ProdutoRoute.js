const express = require("express");
const routerProdu = express.Router();


// controller
const { register } = require("./ProdutoController")

// midleware
const {produtoCreateValidation } = require("./ProdutoValidations");

//rotas
routerProdu.post("/produto/register",produtoCreateValidation(), register);

module.exports = routerProdu;
