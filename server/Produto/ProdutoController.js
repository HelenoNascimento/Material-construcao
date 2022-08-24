const express = require("express");
const router = express.Router();
const Produto = require("./Produto")


// cadastrando um produto
const register = async (req, res) =>{

    const { nome, descricao, quantidade, fornecedor, valor } = req.body;
  
    Produto.create({
        nome: nome,
        descricao: descricao,
        quantidade: quantidade,
        fornecedor: fornecedor,
        valor: valor,
    }).then(() =>{
        res.send("cadastrado")
        console.log( Produto+ " Cadastrado");
    }).catch((error) =>{
        console.log(error);
    })

}

module.exports ={
    register,
};