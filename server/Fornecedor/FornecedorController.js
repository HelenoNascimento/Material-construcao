const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const Fornecedor = require("./Fornecedor")
const Sequelize = require("sequelize");
const Op = Sequelize.Op;              // biblioteca de operadores



// cadastrando um fornecedor
const register = async (req, res) =>{

    const { nome, endereco, telefone} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    const novoFornecedor = await Fornecedor.create({
        nome: nome,
        endereco: endereco,
        telefone: telefone,
       
    }).then(() =>{
        res.status(200).json({ Fornecedor, message: "Produto atualizada com sucesso!" });
        
    }).catch((error) =>{
        console.log(error);
    })
    
}

//listando todos fornecedores

const getFornecedores = async(req, res)  =>{
    //let produtos = {}
    Fornecedor.findAll({
        order:[
            ['id', 'DESC']
        ],
    
    }).then(fornecedores =>{
        res.send(fornecedores);
    })
   // console.log(produtos.fornecedor) 
 //  return produtos
}


module.exports ={
    register,
    getFornecedores
}