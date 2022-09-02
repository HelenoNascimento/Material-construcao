
const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const Cliente = require("../Cliente/Cliente")
const Sequelize = require("sequelize");
const Op = Sequelize.Op;              // biblioteca de operadores

// cadastrando um fornecedor
const register = async (req, res) =>{

    const { nome, endereco, telefone} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    const novoCliente = await Cliente.create({
        nome: nome,
        endereco: endereco,
        telefone: telefone,
       
    }).then(() =>{
        res.status(200).json({ novoCliente, message: "Cliente cadastrado com sucesso!" });
        
    }).catch((error) =>{
        console.log(error);
    })
    
}

//listando todos os clientes

const getClientes = async(req, res)  =>{
    //let produtos = {}
    Cliente.findAll({
        order:[
            ['id', 'DESC']
        ],
    
    }).then(clientes =>{
        res.send(clientes);
    })
   // console.log(produtos.fornecedor) 
 //  return produtos
}


module.exports ={
    register,
    getClientes,
}