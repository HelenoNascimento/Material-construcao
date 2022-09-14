const express = require("express");
const { validationResult } = require("express-validator");
const Fornecedor = require("../Fornecedor/Fornecedor");
const Produto = require("../Produto/Produto");
const Compras = require("./Compras");
const ItemCompra = require("./ItemCompra");
const router = express.Router();


const getAllCompras = async(req, res) =>{
    Compras.findAll({
        order:[
            ['id', 'DESC']
        ],
        include: [{model: Produto},{model: Fornecedor}]
        
    }).then(produtos =>{
        res.send(produtos);
    })
}
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

module.exports = {
    getAllCompras,
    novaCompra,
    novoItemCompra,
}