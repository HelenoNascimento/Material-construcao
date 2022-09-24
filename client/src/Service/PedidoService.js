
import Axios from "axios";
import { api } from "../utils/config"

const novoPedido = async (pedido) =>{
    Axios.post(api+"/pedidos/novoPedido",{
        idCliente: pedido.idClient,
        total_pedido: pedido.total,
        data: pedido.data,
        
    }).then((response) =>{
        console.log(response);
     
    }).catch(function (error) {
        console.log(error)
        
      });
}

const novoItemPedido = async (item) =>{
    Axios.post(api+"/pedidos/novoItemPedido",{
        quantidade: item.quantidade,
        valor_item: item.valor_item,
        idProduto: item.idProduto,
        idPedido:  item.idPedido,
        
    }).then((response) =>{
        console.log(response);
     
    }).catch(function (error) {
        console.log(error)
        
      });
}

//PESQUISANDO ULTIMO PEDIDO

const ultimoPedido = async ()=>{
   const ultimo = await Axios.get(api +"/pedidos/ultimo",{

    }).then((response)=>{
        //console.log(response.data)
        return response.data;
    })
    return ultimo
}
//pesquisando todos os pedidos

const getPedidos = async() =>{
    const res = await Axios.get(api + "/pedidos/all",{
    
    }).then((response)=> {
        return response.data
    })
    return res
}
//Pesquisando pedido pelo ID

const getPedidoID = async (id) => {

    const pedido = await Axios.get(api + "/pedidos/"+id)
        .then((response) =>{
             return response.data
            })
        return pedido
}

//Pesquisando pedido pelo ID

const buscadoPedidoID = async (id) => {

    const pedido = await Axios.post(api + "/pedidos",{
        id:id
    }).then((response) =>{
             return response.data
            })
        return pedido
}

//Pesquisando pedidos dos clientes

const buscaPedidoCliente = async(idCliente) =>{
    const pedido = await Axios.post(api+ "/pedidos/getCliente",{
        idCliente:idCliente
    }).then((response) =>{
        return response.data
    })
    return pedido
}

//Pesquisando as ultimas 5 vendas

const getUltimasVendas = async() =>{
    const vendas = await Axios.get(api+ "/pedidos/getUltimosPedidos",{})
        .then((response) =>{
            return response.data
        })
    return vendas
    
}

const PedidoService = {
    novoPedido,
    novoItemPedido,
    ultimoPedido,
    getPedidos,
    getPedidoID,
    buscadoPedidoID,
    buscaPedidoCliente,
    getUltimasVendas,
}

export default PedidoService