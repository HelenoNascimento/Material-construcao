const express = require("express");
const { register, getClientes } = require("./ClienteController");
const routerClient = express.Router();


// midleware
const {clienteCreateValidation } = require("./ClienteValidations");


//rotas
routerClient.post("/cliente/register",clienteCreateValidation(), register);
routerClient.get("/cliente",getClientes);

module.exports = routerClient