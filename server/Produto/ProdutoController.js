const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const Fornecedor = require("../Fornecedor/Fornecedor")
const Produto = require("./Produto")
const Sequelize = require("sequelize");
const Op = Sequelize.Op;              // biblioteca de operadores

// cadastrando um produto
const register = async (req, res) =>{

    const { nome, descricao, quantidade, idFornecedor, valor } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    const novoProduto = await Produto.create({
        nome: nome,
        descricao: descricao,
        quantidade: quantidade,
        idFornecedor: idFornecedor,
        valor: valor,
    }).then(() =>{
        res.status(200).json({ Produto, message: "Produto atualizada com sucesso!" });
        
    }).catch((error) =>{
        console.log(error);
    })
    

}

const getProdutos = async(req, res)  =>{
    let produtos = {}
    Produto.findAll({
        order:[
            ['id', 'DESC']
        ],
        include: [{model: Fornecedor}]
    }).then(produtos =>{
        res.send(produtos);
    })
   // console.log(produtos.fornecedor) 
 //  return produtos
}

//PESQUISANDO PRODUTOS
const pesquisaProduto = async(req, res) =>{
const { nome } = req.body;
const query = `%${nome}%`; // string de consulta
console.log(query)
    Produto.findAll({
        
        where: {nome: { [Op.like]: query }},
        include: [{model: Fornecedor}]
        
    })
        .then((result) => {
            res.send(result);
        });
  }

  //PESQUISANDO PRODUTOS id
const pesquisaProdutoID = async(req, res) =>{
    const { id } = req.body;
    const query = `%${id}%`; // string de consulta
    console.log(query)
        Produto.findAll({
            where: {id: { [Op.like]: query }},
            include: [{model: Fornecedor}]
        })
            .then((result) => {
                res.json(result)
            });
      }
        //PESQUISANDO PRODUTOS PELO FORNECEDOR
const pesquisaProdutoFornecedor = async(req, res) =>{
    const { idfornecedor } = req.body;
    
   // console.log(query)
        Produto.findAll({
            where: {idfornecedor: idfornecedor },
            include: [{model: Fornecedor}]
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
        const { id, nome, descricao, quantidade, idFornecedor, valor } = req.body;

        Produto.update(
            {
                nome: nome, 
                descricao: descricao,
                quantidade: quantidade, 
                idFornecedor: idFornecedor, 
                valor: valor},{
                    where: {
                        id: id
                    }
                }).then(() =>{
                    res.status(200).json({  message: "Produto Atualizado com sucesso!" });
                })
      }
//atualizando Saldo produto

       // const updateSaldoProduto = async(req, res) =>{
    //const updateSaldoProduto = async(idProduto, quantidade) =>{
    //req, res
    const updateSaldoProduto = async(idProduto, quantidade,status) =>{
   // const { idProduto, quantidade, status} = req.body;
  const produto =  await Produto.findByPk(idProduto)
        let newquantidade = 0;
        if(status == "entrada"){
             newquantidade = (parseInt(produto.quantidade) + parseInt(quantidade))
        }else if(status == "saida"){
             newquantidade = (parseInt(produto.quantidade) - parseInt(quantidade))
        }
   
    Produto.update(
        {
            quantidade: newquantidade},{
                where: {
                    id: idProduto
                }
            }).then(() =>{
                //res.status(200).json({  message: "Saldo produto Atualizado com sucesso!" });
            })
  }
module.exports ={
    register,
    getProdutos,
    pesquisaProduto,
    deleteProduto,
    pesquisaUmProduto,
    updateProduto,
    pesquisaProdutoID,
    pesquisaProdutoFornecedor,
    updateSaldoProduto
};