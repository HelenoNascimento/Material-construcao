const express = require("express");
const { verifyJWT } = require("../Usuario/UsuarioController");
const { register, getClientes, getClientById, getClienteByNome } = require("./ClienteController");
const routerClient = express.Router();


// midleware
const {clienteCreateValidation } = require("./ClienteValidations");


//rotas
routerClient.post("/cliente/register",verifyJWT,clienteCreateValidation(), register);
routerClient.get("/cliente",getClientes);
routerClient.post("/cliente/buscaId",getClientById);
routerClient.post("/cliente/buscaNome",getClienteByNome)

module.exports = routerClient