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



const updateFornecedor = async(req, res) =>{
    const { id, nome, telefone, endereco} = req.body;

    Fornecedor.update(
        {
            
            nome: nome, 
            endereco: endereco,
            telefone: telefone, 
            },{
                where: {
                    id: id
                }
            }).then(() =>{
                res.status(200).json({  message: "Fornecedor Atualizado com sucesso!" });
            })
  }

  ///busca fornecedor pelo ID
  const getFornecedorById = (req, res) => {
    const { id } = req.body;
    Fornecedor.findByPk(id)
    .then((result) => {
        res.json(result)
    });
  }

module.exports ={
    register,
    updateFornecedor,
    getFornecedores,
    getFornecedorById,
}