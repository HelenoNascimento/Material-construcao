
import Axios from "axios";
import { api } from "../utils/config"

//atualizando produto

const updateProduto = async (produto) =>{
    console.log("aqui")
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

   /*
            Axios.post(api+ "/produto/pesquisaUm",{
                id: id
            }).then((response)=>{
                console.log(response.data);
            }).catch(function (error) {
   
                console.log(error.response.data.errors[0].msg)
                //setMessage(error.response.data.errors[0].msg);
               // setError(error)
              
              });
              
            */
}

const ProdutoService = {
    updateProduto
}

export default ProdutoService