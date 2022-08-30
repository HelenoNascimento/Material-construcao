const express = require("express");
const routerForne = express.Router();

// controller
const { register, getFornecedores } = require("./FornecedorController")

// midleware
const {fornecedorCreateValidation } = require("./FornecedorValidations");


//rotas
routerForne.post("/fornecedor/register",fornecedorCreateValidation(), register);
routerForne.get("/fornecedor",getFornecedores);


module.exports = routerForne;