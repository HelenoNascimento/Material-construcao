const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const Produto = require("./Produto")
const Sequelize = require("sequelize");
const Op = Sequelize.Op;              // biblioteca de operadores

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

const getProdutos = async(req, res)  =>{
    let produtos = ''
    Produto.findAll({
        order:[
            ['id', 'DESC']
        ]
    }).then(produtos =>{
        res.send(produtos);
    })
    console.log(produtos) 
}

//PESQUISANDO PRODUTOS
const pesquisaProduto = async(req, res) =>{
const { nome } = req.body;
const query = `%${nome}%`; // string de consulta
console.log(query)
    Produto.findAll({
        where: {nome: { [Op.like]: query }}
    })
        .then((result) => {
            res.json(result)
        });
  }

  //PESQUISANDO PRODUTOS id
const pesquisaProdutoID = async(req, res) =>{
    const { id } = req.body;
    const query = `%${id}%`; // string de consulta
    console.log(query)
        Produto.findAll({
            where: {id: { [Op.like]: query }}
        })
            .then((result) => {
                res.json(result)
            });
      }

  //pesquisando produto pelo id


  //Deletando produto

  const deleteProduto = async (req, res) =>{
    const { id } = req.body;
    if(id !== undefined){
        Produto.destroy({
            where:{
                id: id
            }
        }).then(() =>{
            res.status(200).json({  message: "Produto Deletado com sucesso!" });
        })
    }else{
        res.redirect("/")
    }
  }

  //PESQUISANDO UM PRODUTO
const pesquisaUmProduto = async(req, res) =>{
    const { id } = req.body;
    console.log(id)
        Produto.findByPk(id)
            .then((result) => {
                res.json(result)
            });
      }

      //atualizando produto

      const updateProduto = async(req, res) =>{
        const { id, nome, descricao, quantidade, fornecedor, valor } = req.body;

        Produto.update(
            {
                nome: nome, 
                descricao: descricao,
                quantidade: quantidade, 
                fornecedor: fornecedor, 
                valor: valor},{
                    where: {
                        id: id
                    }
                }).then(() =>{
                    res.status(200).json({  message: "Produto Atualizado com sucesso!" });
                })
      }

module.exports ={
    register,
    getProdutos,
    pesquisaProduto,
    deleteProduto,
    pesquisaUmProduto,
    updateProduto,
    pesquisaProdutoID
};