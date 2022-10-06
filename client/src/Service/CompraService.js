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

//LISTANDO TODAS AS COMPRAS

const getAllCompras = async() =>{

    const compras = await Axios.get(api + "/compras")
        .then((response) =>{
            return response.data
        } ).catch((err) => console.log(err));

        return compras
}

//LISTANDO AS ULTIMAS COMPRAS
const getUltimasCompras = async() =>{
    const ultimas = await Axios.get(api+ "/compras/ultimasCompras")
        .then((response) => {
            return response.data;
        }).catch((err) => console.error(err));
        return ultimas;
}

//pegando compra pelo id
const getCompraById = async (id) =>{

    const compra = await Axios.get(api + "/compra/"+id)
        .then((response) => {  
            return response.data;
        }).catch((err) => console.log(err));
        return compra;
}

//Recebendo produtos

const recebeProduto = async(produto, quantidade, idCompra) =>{

        Axios.post(api + "/compras/recebeProduto",{
            quantidade: quantidade,
            idProduto: produto,
            idCompra: idCompra,
        }).then((response) => response.data)
        .catch((err) => console.log(err));

}


// get compras pendentes

const getComprasPendentes = async () => {
    const compras = await Axios.get(api+"/compras/pendente")
    .then((response) => {
        return response.data;
    }).catch((err) => console.error(err));
    return compras;
    
}




const CompraService = {
    novaCompra,
    getUltimaCompra,
    itemCompra,
    getAllCompras,
    getUltimasCompras,
    getCompraById,
    recebeProduto,
    getComprasPendentes
}

export default CompraService;