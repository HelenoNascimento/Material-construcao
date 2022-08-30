const express = require("express");
const routerForne = express.Router();

// controller
const { register } = require("./FornecedorController")

// midleware
const {fornecedorCreateValidation } = require("./FornecedorValidations");


//rotas
routerForne.post("/fornecedor/register",fornecedorCreateValidation(), register);


module.exports = routerForne;