import axios from "axios";
import Axios from "axios";
import { api } from "../utils/config"

// nova compras
const novaCompra = async (compra) =>{
    Axios.post( api +"/compras/novaCompra",{
        total: compra.total,
        data: compra.data,
        data_entrega: compra.data_entrega,
        status: compra.status,
        idFornecedor: compra.idFornecedor,
    }).then((response) =>{
        console.log(response);
    }).catch((err) =>{
        console.log(err)
    })

}

//pegando ultima compra
const getUltimaCompra = async(req,res) =>{
   const compras = await Axios.get(api + "/compras/ultimaCompra") 
        .then((response) => {
            return response.data
        }).catch((err) =>{
            console.log(err)
        })
    return compras
}

///salvando a compra

const itemCompra = async(item) =>{

    Axios.post(api + '/compras/novoItemCompra',{
        quantidade: item.quantidade,
        valor_item: item.valor_item,
        idProduto: item.idProduto,
        idCompra: item.idCompra,
    }).then((response) =>{
        console.log(response);
    }).catch((err) =>{
        console.log(err)
    })
}













const CompraService = {
    novaCompra,
    getUltimaCompra,
    itemCompra
}

export default CompraService;