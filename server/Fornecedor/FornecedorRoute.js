const express = require("express");
const { verifyJWT } = require("../Usuario/UsuarioController");
const routerForne = express.Router();

// controller
const { register, getFornecedores, updateFornecedor, getFornecedorById } = require("./FornecedorController")

// midleware
const {fornecedorCreateValidation } = require("./FornecedorValidations");


//rotas
routerForne.post("/fornecedor/register",verifyJWT,fornecedorCreateValidation(), register);
routerForne.get("/fornecedor",getFornecedores);
routerForne.post("/fornecedor/update",updateFornecedor);
routerForne.post("/fornecedor/getId",getFornecedorById);


module.exports = routerForne;