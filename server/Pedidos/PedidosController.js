const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();


const Sequelize = require("sequelize");
const Cliente = require("../Cliente/Cliente");
const Produto = require("../Produto/Produto");
const ProdutoController = require("../Produto/ProdutoController");
const ItemPedidos = require("./ItemPedidos");
const Pedidos = require("./pedidos");
const Op = Sequelize.Op;              // biblioteca de operadores

  //PESQUISANDO UM PEDIDO
  const getPedido = async(req, res) =>{
    const { id } = req.body;
    const query = `%${id}%`; // string de consulta
    console.log(id)
        Pedidos.findAll({
            where: {id: { [Op.like]: query }},
            include:[{model: Cliente}]})
            
            .then((result) => {
                res.json(result)
            });
      }
//PESQUISANDO PEDIDO POR NOME CLIENTE

const getPedidoCliente = async(req, res) =>{
    const {idCliente} = req.body;
   // const query = `%${nome}%`;
    Pedidos.findAll({
       // where: {idCliente: { [Op.like]: query }},
            where: {idCliente: idCliente},
        include:[{model: Cliente}]
    }).then((result) =>{
        res.json(result)
    })
}
    
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

      //PESQUISANDO AS ULTIMAS 5 VENDAS
      const getUltimasVendas = async(req, res) =>{
        Pedidos.findAll({
            limit:4,
            order:[
                ['id', 'DESC']
            ],
            include: [{model: Produto},{model: Cliente}]
            
        }).then(produtos =>{
            res.send(produtos);
        })
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
    const status = "saida";
    ProdutoController.updateSaldoProduto(idProduto,quantidade,status)
    const novoItemPedido = await ItemPedidos.create({
        quantidade: quantidade,
        valor_item: valor_item,
        idProduto: idProduto,
        idPedido:  idPedido
    }).then(() =>{
       
       // res.status(200).json({ ItemPedidos, message: "Item Adicionado com sucesso!" });
        
    }).catch((error) =>{
        console.log(error);
    })
  
  }

  //LISTANDO TODOS OS PEDIDOS
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


  //LISTANDO PEDIDO PELO ID
  const getPedidoById = async(req, res)  =>{
    const{id} = req.params;
    Pedidos.findByPk(id,{
        
        include: [{model: Produto},{model: Cliente}]
        
    }).then(pedido =>{
        res.send(pedido);
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
        getPedidoById,
        getPedidoCliente,
        getUltimasVendas,
    };