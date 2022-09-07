
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


const PedidoService = {
    novoPedido,
    novoItemPedido,
    ultimoPedido,
    getPedidos,
}

export default PedidoService