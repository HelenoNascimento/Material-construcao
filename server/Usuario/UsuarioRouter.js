const express = require("express");
const routerUser = express.Router();


// controller
const { newUsuario, login, verifyJWT} = require("./UsuarioController");
const { UsuarioValidator  } = require("./UsuarioValidations");

routerUser.post("/user/register",verifyJWT, UsuarioValidator(),newUsuario )
routerUser.post("/user/login", login)

module.exports = routerUser;