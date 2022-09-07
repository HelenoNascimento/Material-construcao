
import Axios from "axios";
import { api } from "../utils/config"

const cadastrarCliente = async (cliente) =>{
    Axios.post(api+"/cliente/register",{
        nome: cliente.nome,
        endereco: cliente.endereco,
        telefone: cliente.telefone,
        
    }).then((response) =>{
        console.log(response);
     
    }).catch(function (error) {
        console.log(error)
        
      });
}

  //Lista todos os clientes
  const getAllClientes = async () =>{

    try {
        const res = await fetch(api +"/cliente")
             .then((res)=> res.json())
             .catch((err)=> err);
       // console.log(res)
             return res;
        
    } catch (error) {
        console.log(error)
    }

}

// pesquisando cliente por ID
const getClientById = async(id)=>{
    const res = await Axios.post(api +"/cliente/buscaId",{
    id: id,
}).then((response)=>{
    //console.log(response.data)
    return response.data;
})
return res
}

//pesquisando todos os pedidos

const getPedidos = async() =>{
    const res = await Axios.get(api + "/pedidos/all",{

    }).then((response)=> {
        return response.data
    })
    return res
}


const ClienteService = {
    cadastrarCliente,
    getAllClientes,
    getClientById,
    getPedidos,
}

export default ClienteService