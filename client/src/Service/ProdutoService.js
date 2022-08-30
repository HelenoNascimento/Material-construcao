

import Axios from "axios";
import { api } from "../utils/config"



//Lista todos os produtos

const getAllProdutos = async () => {
 
       try {

        const res = await fetch(api+"/produto")
              .then((res) => res.json())
              .catch((err) => err);
             //console.log(res)
          return res;

        
      } catch (error) {
        console.log(error);
      }
    
       
}


// pequisando produto

     const PesquisaProduto = async (consulta) =>{
        const res = await Axios.post(api +"/produto/pesquisa",{
        nome: consulta,
    }).then((response)=>{
            //console.log(response.data)
            return response.data;
        })
        return res
    }

// pesquisando produto ID
    const getProdutoById = async(id)=>{
        const res = await Axios.post(api +"/produto/produtoid",{
        id: id,
    }).then((response)=>{
        //console.log(response.data)
        return response.data;
    })
    return res
}





//atualizando produto

const updateProduto = async (produto) =>{
    
    try{
        const res = await Axios.post(api+ "/produto/update",{
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            valor: produto.valor,
            quantidade: produto.quantidade,
            fornecedor: produto.fornecedor
        })
        return res;
    }catch(error){
        console.log(error);
    }

}
    // ****** deletando produto ***

    const deleteProduto = async (id) =>{
        try{
            const res = await Axios.post(api+ "/produto/delete",{
                id: id
            })
            return res;
        }catch(error){
            console.log(error)
      }
    
    }


const ProdutoService = {
    updateProduto,
    deleteProduto,
    getAllProdutos,
    PesquisaProduto,
    getProdutoById
}

export default ProdutoService