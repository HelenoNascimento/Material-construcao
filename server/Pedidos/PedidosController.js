const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();


const Sequelize = require("sequelize");
const Cliente = require("../Cliente/Cliente");
const Produto = require("../Produto/Produto");
const ItemPedidos = require("./ItemPedidos");
const Pedidos = require("./pedidos");
const Op = Sequelize.Op;              // biblioteca de operadores

  //PESQUISANDO UM PEDIDO
  const getPedido = async(req, res) =>{
    const { id } = req.body;
    console.log(id)
        Pedidos.findByPk(id,{include:{model: Cliente}})  .then((result) => {
                res.json(result)
            });
      }

     
      module.exports ={
        getPedido,
    };

     //PESQUISANDO UM PEDIDO
  const getProdutosPedidos = async(req, res) =>{
    const { id } = req.body;
    ItemPedidos.findAll({
        where: {idCliente: id},
        include: [{model: Cliente}]
    })
        .then((result) => {
            res.json(result)
        });
      }

          //PESQUISANDO ULTIMO PEDIDO *********************************
  const getUltimoPedido = async(req, res) =>{
   
    Pedidos.findAll({
        limit: 1,
        order:[
            ['id', 'DESC']
        ] 
    })
        .then((result) => {
            res.json(result)
        });
      }

      // cadastrando um pedido *************************************
const registerPedido = async (req, res) =>{

  //const { idCliente, total_pedido, data, quantidade, valor, Id_produto, id_pedido } = req.body;
  const { idCliente, total_pedido, data } = req.body;
  const errors = validationResult(req);
  
  if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array()})
  }

  const novoPedido = await Pedidos.create({
      total: total_pedido,
      data: data,
      idCliente: idCliente,
  }).then(() =>{
      res.status(200).json({ Pedidos, message: "Pedido Criado com sucesso!" });
      
  }).catch((error) =>{
      console.log(error);
  })

}
// cadastrando um item pedido
const registerNovoItem = async (req, res) =>{

    //const { idCliente, total_pedido, data, quantidade, valor, Id_produto, id_pedido } = req.body;
    const { quantidade, valor_item, idProduto, idPedido } = req.body;
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
  
    const novoItemPedido = await ItemPedidos.create({
        quantidade: quantidade,
        valor_item: valor_item,
        idProduto: idProduto,
        idPedido:  idPedido,
    }).then(() =>{
        res.status(200).json({ ItemPedidos, message: "Item Adicionado com sucesso!" });
        
    }).catch((error) =>{
        console.log(error);
    })
  
  }

  
const getAllPedidos = async(req, res)  =>{
    let produtos = {}
    Pedidos.findAll({
        order:[
            ['id', 'DESC']
        ],
        include: [{model: Produto},{model: Cliente}]
        
    }).then(produtos =>{
        res.send(produtos);
    })
   // console.log(produtos.fornecedor) 
 //  return produtos
}

      module.exports ={
        getPedido,
        getProdutosPedidos,
        registerPedido,
        registerNovoItem,
        getUltimoPedido,
        getAllPedidos,
    };