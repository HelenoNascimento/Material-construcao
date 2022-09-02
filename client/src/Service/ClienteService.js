
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


const ClienteService = {
    cadastrarCliente,
    getAllClientes
}

export default ClienteService