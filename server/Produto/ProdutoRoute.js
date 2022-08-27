const express = require("express");
const routerProdu = express.Router();


// controller
const { register, getProdutos, pesquisaProduto, deleteProduto } = require("./ProdutoController")

// midleware
const {produtoCreateValidation } = require("./ProdutoValidations");

//rotas
routerProdu.post("/produto/register",produtoCreateValidation(), register);
routerProdu.get("/produto",getProdutos);
routerProdu.post("/produto/pesquisa",pesquisaProduto)
routerProdu.post("/produto/delete",deleteProduto)

module.exports = routerProdu;
