const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const Produto = require("./Produto")


// cadastrando um produto
const register = async (req, res) =>{

    const { nome, descricao, quantidade, fornecedor, valor } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    const novoProduto = await Produto.create({
        nome: nome,
        descricao: descricao,
        quantidade: quantidade,
        fornecedor: fornecedor,
        valor: valor,
    }).then(() =>{
        res.status(200).json({ Produto, message: "Produto atualizada com sucesso!" });
        
    }).catch((error) =>{
        console.log(error);
    })
    

}

module.exports ={
    register,
};