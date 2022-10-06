const express = require("express");
const { validationResult } = require("express-validator");
const Fornecedor = require("../Fornecedor/Fornecedor");
const ProdutoController = require("../Produto/ProdutoController");
const Produto = require("../Produto/Produto");
const Compras = require("./Compras");
const ItemCompra = require("./ItemCompra");
const router = express.Router();

//pegando todas as compras
const getAllCompras = async(req, res) =>{
    Compras.findAll({
        order:[
            ['id', 'DESC']
        ],
        include: [{model: Produto},{model: Fornecedor}]
        
    }).then(compras =>{
        res.send(compras);
    })
}

// Realizando uma nova compra
const novaCompra = async( req, res) =>{
    const { idFornecedor, total, data, data_entrega, status } = req.body;
    const novaCompra = await Compras.create({
        total: total,
        data: data,
        data_entrega: data_entrega,
        status: status,
        idFornecedor: idFornecedor,
    }).then(() =>{
        res.status(200).json({ Compras, message: "Compra criado com sucesso!" });
        
    }).catch((error) =>{
        console.log(error);
    })
}


const novoItemCompra = async (req, res)=>{

    const{ quantidade,  valor_item, idProduto, idCompra} = req.body;

    const novoItemCompra = await ItemCompra.create({
        quantidade: quantidade,
        valor_item: valor_item,
        idProduto: idProduto,
        idCompra: idCompra,
    }).then(()=>{
        res.status(200).json({ ItemCompra,  message: "Item adicionado com sucesso"});
    }).catch ((error) =>{
        console.log(error);
    })
}


//pegando a ultima compra

const getUltimaCompra = async (req, res) => {

    Compras.findAll({
        order:[
            ['id', 'DESC']
        ],
        include: [{model: Produto},{model: Fornecedor}]
        
    }).then(compras =>{
        res.send(compras);
    })
}
//PESQUISANDO AS ULTIMAS 3 COMPRAS
const getUltimasCompras = async(req, res) =>{
    Compras.findAll({
        limit:3,
        order:[
            ['id', 'DESC']
        ],
        include: [{model: Produto},{model: Fornecedor}]
        
    }).then(produtos =>{
        res.send(produtos);
    })
  }

  //Pesquisando Compras Pendentes
const getComprasPendentes = async(req, res) => {

    Compras.findAll({
       
        order:[
            ['id', 'DESC']
        ],
        where: {
            status: "Pendente"
        },
    include: [{model: Produto},{model: Fornecedor}]
    
    }).then(produtos =>{
        res.send(produtos);
    })
  
}
  //pesquisando compra pelo id

  const getCompraById = async(req, res) =>{
    const{id} = req.params;

    Compras.findByPk(id,{
        include: [{model: Produto},{model: Fornecedor}]
    }).then(pedido =>{
        res.send(pedido);
    }).catch(err =>console.log(err));
  }
  

  const recebeProduto = async (req, res) =>{

    //const { idCliente, total_pedido, data, quantidade, valor, Id_produto, id_pedido } = req.body;
    const { quantidade, idProduto, idCompra } = req.body;
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    const status = "entrada";
    await ProdutoController.updateSaldoProduto(idProduto,quantidade,status)

    Compras.update(
        {
            status: "Entregue"},{
                where: {
                    id: idCompra
                }
            }).then(() =>{
              //  res.status(200).json({  message: "Saldo produto Atualizado com sucesso!" });
            }).catch(err => console.log(err));
}
       

module.exports = {
    getAllCompras,
    novaCompra,
    novoItemCompra,
    getUltimaCompra,
    getUltimasCompras,
    getCompraById,
    recebeProduto,
    getComprasPendentes,
}