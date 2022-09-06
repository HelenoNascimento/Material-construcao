const express = require("express");
const { register, getClientes, getClientById } = require("./ClienteController");
const routerClient = express.Router();


// midleware
const {clienteCreateValidation } = require("./ClienteValidations");


//rotas
routerClient.post("/cliente/register",clienteCreateValidation(), register);
routerClient.get("/cliente",getClientes);
routerClient.post("/cliente/buscaId",getClientById);

module.exports = routerClient