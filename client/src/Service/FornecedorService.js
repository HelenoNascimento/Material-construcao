import Axios from "axios";
import { api } from "../utils/config"





  //Lista todos os fornecedores
    const getAllFornecedores = async () =>{

            try {
                const res = await fetch(api +"/fornecedor")
                     .then((res)=> res.json())
                     .catch((err)=> err);
               // console.log(res)
                     return res;
                
            } catch (error) {
                console.log(error)
            }

    }

    // cadastrando fornecedor

    const cadFornecedor = async (fornecedor) =>{
        Axios.post(api+"/fornecedor/register",{
            nome: fornecedor.nome,
            endereco: fornecedor.endereco,
            telefone: fornecedor.telefone,
            
        }).then((response) =>{
            console.log(response);
         
        }).catch(function (error) {
            console.log(error)
            
          });
    }
//atualizando fornecedor

const updateFornecedor = async (fornecedor) =>{
    
    try{
        const res = await Axios.post(api+ "/fornecedor/update",{
            id: fornecedor.id,
            nome: fornecedor.nome,
            telefone: fornecedor.telefone,
            endereco: fornecedor.endereco,
            
        })
        return res;
    }catch(error){
        console.log(error);
    }

}




    const FornecedorService = {
        getAllFornecedores,
        cadFornecedor,
        updateFornecedor
    }




export default FornecedorService