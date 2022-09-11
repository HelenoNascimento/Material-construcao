const express = require("express");
const routerProdu = express.Router();


// controller
const { register, getProdutos, pesquisaProduto, deleteProduto, pesquisaUmProduto, updateProduto, pesquisaProdutoID, pesquisaProdutoFornecedor, updateSaldoProduto } = require("./ProdutoController")

// midleware
const {produtoCreateValidation } = require("./ProdutoValidations");

//rotas
routerProdu.post("/produto/register",produtoCreateValidation(), register);
routerProdu.get("/produto",getProdutos);
routerProdu.post("/produto/pesquisa",pesquisaProduto)
routerProdu.post("/produto/pesquisaUm",pesquisaUmProduto)
routerProdu.post("/produto/delete",deleteProduto)
routerProdu.post("/produto/update",updateProduto)
routerProdu.post("/produto/produtoid",pesquisaProdutoID)
routerProdu.post("/produto/produtoFornecedor",pesquisaProdutoFornecedor)
routerProdu.post("/produto/updateQuantidade",updateSaldoProduto)

module.exports = routerProdu;
