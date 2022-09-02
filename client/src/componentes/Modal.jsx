import {React, useState,useEffect} from 'react'
import ProdutoService from '../Service/ProdutoService';
import Axios from "axios";
import Select from 'react-select'
import FornecedorService from '../Service/FornecedorService';

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
    const [fornecedores, setFornecedores] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [fornecedorUpdate, setFornecedorUpdate] = useState("");
    const [ idFornecedor, setIdFornecedor ] = useState(""); 
    const [ novoFornecedor, setNovoFornecedor ] = useState(""); 
    const [ id, setId] = useState("");
    const [valor, setValor] = useState("");
    const [pro, setPro] = useState("");
    const  [produtoEdit, setProdutoEdit] = useState("");
    
    //const  [teste, setTeste] = useState("teste");

    const teste = []

    useEffect(()=>{
        
        let desc = produtoUpdate.produtoUpdate.descricao
        setDescricao(desc)
        setNome(produtoUpdate.produtoUpdate.nome)
        setQuantidade(produtoUpdate.produtoUpdate.quantidade)
        setFornecedorUpdate(produtoUpdate.produtoUpdate.fornecedor)
        setValor(produtoUpdate.produtoUpdate.valor)
        setId(produtoUpdate.produtoUpdate.id)
        setIsLoading(false);
        setIdFornecedor(fornecedorUpdate.id)
       
    },[produtoUpdate])

    useEffect(() => {
      const carregaFornecedor = async() =>{
            const resultado = await FornecedorService.getAllFornecedores();
            setFornecedores(resultado);
           //console.log(resultado)
          // console.log(fornecedores)
      }
      carregaFornecedor();
  },[])

  //console.log(idFornecedor)
  console.log(idFornecedor)
  if(fornecedores){
    let cont =0 ;
    fornecedores.forEach(fornecedor => {
        
        
       teste[cont] =  { value: fornecedor.id, label: fornecedor.nome }
       cont ++
     });
   //  console.log(teste)
     //console.log(options)
}

  
    
       const updateProduto = (e) =>{
   // e.preventDefault()
   
        if(novoFornecedor){
          console.log("entrou aqui")
         // setNovoFornecedor(fornecedorUpdate.id)
    
         // setNovoFornecedor(idFornecedor)
         //setIdFornecedor(novoFornecedor)

         const updateProduto = {
                  
                    id: id,
                    nome: nome,
                    descricao: descricao,
                    quantidade: quantidade,
                    idFornecedor: novoFornecedor,
                    valor: valor, 
                  }
           ProdutoService.updateProduto(updateProduto);
        }else{
           const updateProduto = {
                          
                    id: id,
                    nome: nome,
                    descricao: descricao,
                    quantidade: quantidade,
                    idFornecedor: fornecedorUpdate.id,
                    valor: valor, 
          }
   ProdutoService.updateProduto(updateProduto);
         
        }
        //setIdFornecedor(novoFornecedor)
     
        
        if(novoFornecedor){
          console.log("atualizando");
          console.log(updateProduto);
         
      
      //    ProdutoService.updateProduto(updateProduto);
        }
 // ProdutoService.updateProduto(updateProduto);
       console.log(fornecedorUpdate)
        //
       
      }
      console.log(updateProduto);
      console.log(novoFornecedor)
      //console.log(fornecedor)
      
  
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
                  <Select 
                  options={teste} placeholder="Fornecedores" className="select"  onChange={(e) => setNovoFornecedor(e.value)}
                  
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