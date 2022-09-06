
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
    Axios.post(api+"/pedidos/novoItem",{
        quantidade: item.quantidade,
        valor_item: item.valor_item,
        idProduto: item.id_Produto,
        idPedido:  item.id_Pedido,
        
    }).then((response) =>{
        console.log(response);
     
    }).catch(function (error) {
        console.log(error)
        
      });
}



const PedidoService = {
    novoPedido,
    novoItemPedido,
}

export default PedidoService