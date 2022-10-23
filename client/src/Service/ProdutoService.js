

import Axios from "axios";
import { api } from "../utils/config"

//pesquisando um produto pelo ID

const getUmProduto = async(id)=>{
        try {
            const res = await Axios.post(api +"/produto/pesquisaUm",{
                id: id,
            }).then((response)=>{
                //console.log(response.data)
                return response.data;
            })
            return res
        } catch (error) {
            console.log(error)
        }
}


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

const cadastraProduto = async (produto) =>{
    Axios.post(api+"/fornecedor/register",{
        nome: produto.nome,
        endereco: produto.endereco,
        telefone: produto.telefone,
        
    }).then((response) =>{
        console.log(response);
     
    }).catch(function (error) {
        console.log(error)
        
      });
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
// pesquisando produto ID
const getProdutosByFornecedor = async(idFornecedor)=>{
    const res = await Axios.post(api +"/produto/produtoFornecedor",{
    idfornecedor: idFornecedor,
}).then((response)=>{
    //console.log(response.data)
    return response.data;
})
return res
}

//pesquisando produtos desativados

const getProdutosDesativados = async() =>{
    const produtos = await Axios.get(api +"/produtoDesativado")
    .then((response)=>{
        return response.data
    }).catch((err)=>{console.error(err)});
    console.log(produtos)
    return produtos;

}

//pesquisando produtos baixo estoque
const getProdutosEstoqueBaixo = async() =>{
    const produtos = await Axios.get(api +"/produto/baixoEstoque")
        .then((response) =>{
            return response.data
        }).catch((err)=>{console.error(err)});
    return produtos;
}



//atualizando produto

const updateProduto = async (produto) =>{
    console.log(produto.id)
    try{
        const res = await Axios.post(api+ "/produto/update",{
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            valor: produto.valor,
            quantidade: produto.quantidade,
            idFornecedor: produto.idFornecedor,
            status: produto.status,
            valor_compra: produto.valor_compra,
            minimo_estoque: produto.minimo_estoque,
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
    getProdutoById,
    getProdutosByFornecedor,
    cadastraProduto,
    getUmProduto,
    getProdutosDesativados,
    getProdutosEstoqueBaixo
}

export default ProdutoService