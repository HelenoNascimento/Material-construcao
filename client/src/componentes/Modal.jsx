import {React, useState,useEffect} from 'react'
import ProdutoService from '../Service/ProdutoService';
import Axios from "axios";

import "./Modal.css"

const closeModal = ()  =>{
    const modal = document.querySelector("#modal");
    modal.classList.add("hide");
};

const Modal = (produtoUpdate ) => {
  const [isLoading, setIsLoading] = useState(true);

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [ id, setId] = useState("");
    const [valor, setValor] = useState("");
    const [pro, setPro] = useState("");
    const  [produtoEdit, setProdutoEdit] = useState("");
    
    const  [teste, setTeste] = useState("teste");

    

    useEffect(()=>{
        
        let desc = produtoUpdate.produtoUpdate.descricao
        setDescricao(desc)
        setNome(produtoUpdate.produtoUpdate.nome)
        setQuantidade(produtoUpdate.produtoUpdate.quantidade)
        setFornecedor(produtoUpdate.produtoUpdate.fornecedor)
        setValor(produtoUpdate.produtoUpdate.valor)
        setId(produtoUpdate.produtoUpdate.id)
        setIsLoading(false);
        
    },[produtoUpdate])

    
  //  let tes = produto.nomei
    
    //console.log(produto)
       
       const handleEdit =  () =>{
        
      }

      // carregando dados do produto
      /*useEffect(()=>{
        if(id){
         handleEdit()
          
        }
      
       },[id])*/
       const updateProduto = (e) =>{
        e.preventDefault();
  
        const updateProduto = {
          
            id: id,
            nome: nome,
            descricao: descricao,
            quantidade: quantidade,
            fornecedor: fornecedor,
            valor: valor, 
        }

        ProdutoService.updateProduto(updateProduto);
        console.log("atualizando");
        console.log(updateProduto);
      }
      
  
   //<Select options={options} placeholder="Tipo material" className="select"/>
  return (
    <div id="modal" className="hide">
     
     <div className="fade" onClick={closeModal}></div>
        <div className="modal">
        
        {!isLoading ? (
          <>
          <h2>Produto: {nome}</h2>
          <form className="formulario" onSubmit={updateProduto}>
              
              <div className='input_container' >
                  <label>Nome:</label>
                  <input type="text" placeholder="Nome" 
                  onChange={(e) => setNome(e.target.value)} 
                  value={nome || ""}
                  />   
              </div>
              <div className='input_container'> 
                  <label>Descricao:</label>
                  <input type="text" placeholder="Descricao" 
                 onChange={(e) => setDescricao(e.target.value)}
                  value={descricao || ""} 
                 />   
              </div>
             
              
                <div className="numericos">
                    <div className='input_container'>
                      <label>Valor de venda :</label>
                          <input type="text" placeholder="Valor" 
                            onChange={(e) => setValor(e.target.value)}
                            value={valor || ""}
                            />   
                  </div>
                  <div className='input_container'> 
                  <label>Quantidade:</label>
                  <input
                   type="text" 
                   placeholder="Quantidade"  
                 onChange={(e) => setQuantidade(e.target.value)} 
                  value={quantidade || ""}
                  />   
                 
                  </div>

                </div>
               
              <div className='input_container'>
                  <label>Fornecedor:</label>
                  <input type="text" placeholder="Fornecedor"
                   onChange={(e) => setFornecedor(e.target.value)} 
                   value={fornecedor || ""}
                   />   
              </div>
              
              
              
           
             
              <button className="register--button">Alterar</button>
              
              </form>
          </>
        ) : (
          <p>Carregando</p>
        )}
            
        </div>
    
      </div> 
     
         )
 }
export default Modal