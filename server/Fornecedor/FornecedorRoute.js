const express = require("express");
const routerForne = express.Router();

// controller
const { register, getFornecedores, updateFornecedor } = require("./FornecedorController")

// midleware
const {fornecedorCreateValidation } = require("./FornecedorValidations");


//rotas
routerForne.post("/fornecedor/register",fornecedorCreateValidation(), register);
routerForne.get("/fornecedor",getFornecedores);
routerForne.post("/fornecedor/update",updateFornecedor);


module.exports = routerForne;