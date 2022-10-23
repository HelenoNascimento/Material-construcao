import React from 'react'
import "./Tela_produto.css"
import { useParams } from "react-router-dom"
import  { useEffect, useState } from 'react'
import ProdutoService from '../../Service/ProdutoService'

const Tela_produto = () => {
    // dados produto
    const [codigo, setCodigo] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [status, setStatus] = useState("");
    const [estoque, setEstoque] = useState("");
    const [minimoEstoque, setMinimoEstoque] = useState("");
    const [valor, setValor] = useState("");
    const [valorCompra, setValorCompra] = useState("");


    const [produto, setProduto] = useState();
    const {id} = useParams()


    useEffect(()=> {

        const carregaProduto = async () =>{
            let prod = await ProdutoService.getUmProduto(id)
                setProduto(prod)
                setDescricao(prod.descricao)
                setCodigo(prod.id)
                setNome(prod.nome)
                setEstoque(prod.quantidade)
                setMinimoEstoque(prod.minimo_estoque)
                setValor(prod.valor)
                setStatus(prod.status)
                setValorCompra(prod.valor_compra)
                setFornecedor(prod.fornecedor.id)
        }
        carregaProduto()
        console.log(nome)

    },[])
  
    
    console.log(id)
    if(!produto){
        return <p>carregando</p>
    }
    if(!nome){
        return <p>carregando</p>
    }
    if(!status){
        return <p>carregando</p>
    }

    const handleSalvar = () =>{
           const newProduto ={
            id: codigo,
            nome: nome,
            descricao: descricao,
            idFornecedor: fornecedor,
            status: status,
            valor: valor,
            valor_compra: valorCompra,
            minimo_estoque: minimoEstoque,
            quantidade: estoque,
           }
          // alert(newProduto.id)
      ProdutoService.updateProduto(newProduto)
     
    }
    
   
  return (
    <div className='container-tela-produto'>
       <div className='cabecalho'> </div>
       <div className='container-campo'> 

            <div className='campo-esquerdo'> 
                <div className='c-dados'> 
                    <label><span>Codigo</span> 
                        <input type="number" disabled placeholder='Codigo' value={produto.id || ""} onChange={(e) => setCodigo(e.target.value)}/>
                    </label>
                </div>
                <div className='c-dados'> 
                    <label><span>Nome</span> 
                        <input type="text" placeholder='Nome' value={nome || ""} onChange={(e) => setNome(e.target.value)}/>
                    </label>
                </div>
                <div className='c-dados'> 
                    <label><span>Descricao</span> 
                        <input type="text" placeholder='Descricao' value={descricao || ""} onChange={(e) => setDescricao(e.target.value)}/>
                    </label>
                </div>
                <div className='c-dados'> 
                    <label><span>fornecedor</span> 
                        <input type="text" placeholder='Fornecedor' value={produto.fornecedor.nome || ""} onChange={(e) => setFornecedor(e.target.value)}/>
                    </label>
                </div>
                <div className='c-dados'> 
                        <label> <span>Status</span> 
                        {status === "Ativo" &&
                        <select name="select" onChange={(e) => setStatus(e.target.value)}>
                                    <option value={status} >{status}</option>
                                    <option value="Desativado" >Desativado</option>
                                </select>
                        }
                         {status === "Desativado" &&
                        <select name="select" onChange={(e) => setStatus(e.target.value)}>
                                    <option value={status} >{status}</option>
                                    <option value="Ativo">Ativo</option>
                                </select>
                        }
                    </label>

                                 
                </div>
                
                
            </div>
            <div className='campo-direito'> 
                <div className='c-dados numerico'> 
                        <label> <span>Estoque</span>
                            <input type="number" placeholder='Quantidade' value={estoque|| ""} onChange={(e) => setEstoque(e.target.value)}/>
                    </label>
                </div>
                <div className='c-dados numerico' > 
                        <label><span>Estoque minimo</span>
                            <input type="number" placeholder='Quantidade minima' value={minimoEstoque || ""} onChange={(e) => setMinimoEstoque(e.target.value)}/>
                    </label>
                </div>
                <div className='c-dados numerico'> 
                        <label><span>Valor Venda </span> 
                            <input type="number" placeholder='Valor venda' value={valor || ""} onChange={(e) => setValor(e.target.value)}/>
                    </label>
                </div>
                <div className='c-dados numerico'> 
                        <label><span>Valor Compra</span>  
                            <input type="number" placeholder='Valor Compra' value={valorCompra || ""} onChange={(e) => setValorCompra(e.target.value)}/>
                    </label>
                </div>
                
            </div>
       <button onClick={handleSalvar}>Salvar</button>
       </div>
    </div>
  )
}

export default Tela_produto