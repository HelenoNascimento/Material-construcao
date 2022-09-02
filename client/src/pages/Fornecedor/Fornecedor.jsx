import React from 'react'
import {useState,useEffect} from 'react'
import { AiFillDelete,AiFillEdit  } from 'react-icons/ai';
import { BiCommentEdit  } from 'react-icons/bi';
import FornecedorService from '../../Service/FornecedorService';

import "./Fornecedor.css"

const closeModal = ()  =>{
  const modal = document.querySelector("#modal-forne");
  modal.classList.add("hide-forne");
};

const Fornecedor = () => {
  
  const [fornecedores, setFornecedores] = useState("");
  const [ id, setId] = useState("");
  const [ nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [atualizar, setAtualizar] = useState(false);

  const [cadastrar , setCadastrar] = useState(true);



  const hideOrShowModal = (display) =>{
    const modal = document.querySelector("#modal-forne");
    if(display){
      modal.classList.remove("hide-forne")
    }else{
      modal.classList.add("hide-forne");
    }
  }

const openModal = () =>{
  setCadastrar(true)
  hideOrShowModal(true)
}

const editFornecedor = (fornecedor) =>{
 // setProdutoUpdate(produto)
 setCadastrar(false)
 hideOrShowModal(true)
 setId(fornecedor.id)
  setNome(fornecedor.nome)
  setEndereco(fornecedor.endereco)
  setTelefone(fornecedor.telefone)
  console.log(nome)
  
  
}

const atualizarFornecedor =(e) =>{

    const updateFornecedor = {
      id: id,
      nome: nome,
      telefone: telefone,
      endereco: endereco,
    }

    FornecedorService.updateFornecedor(updateFornecedor)
}



const cadastrarFornecedor = (e) =>{
 //e.preventDefault();
   
   if(cadastrar === true){
    console.log("cadastrar")
    const newFornecedor = {
      nome: nome,
      endereco: endereco,
      telefone: telefone,
     }
     FornecedorService.cadFornecedor(newFornecedor);
     setAtualizar(true)

   }else if(cadastrar === false){
    console.log("editar")
    const updateFornecedor = {
      id: id,
      nome: nome,
      telefone: telefone,
      endereco: endereco,
    }


    FornecedorService.updateFornecedor(updateFornecedor)
    setAtualizar(true)
    
   }
  // FornecedorService.cadFornecedor(newFornecedor);
   setNome("");
   setEndereco("");
   setTelefone("");
   setAtualizar(true)
   closeModal()
}
 
  useEffect(() => {
      const carregaFornecedor = async() =>{
            const resultado = await FornecedorService.getAllFornecedores();
            setFornecedores(resultado);
           //console.log(resultado)
            console.log(fornecedores)
      }
      carregaFornecedor();
  },[atualizar])
 
  return (
    <div className='container--fornecedor'>
      <div className="row"> 
        <button onClick={openModal}>Cadastrar Fornecedor</button>
      </div>

    <div id="modal-forne" className="hide-forne">
      <div className="fade-forne" onClick={closeModal}></div>
        <div className="modal-forne">
      
        <h2>Cadastrar Fornecedor:</h2>
        <form className="formulario" onSubmit={cadastrarFornecedor}>
        <div className='input_container' >
            <label>Nome:</label>
            <input type="text" placeholder="Nome" 
            onChange={(e) => setNome(e.target.value)} value={nome || ""}
            />   
        </div>
        <div className='input_container'> 
            <label>Endereço:</label>
            <input type="text" placeholder="Endereço" 
            onChange={(e) => setEndereco(e.target.value)} value={endereco || ""} 
            />   
        </div>
       
        <div className='input_container'> 
            <label>Telefone:</label>
            <input
             type="text" 
             placeholder="Telefone"  
            onChange={(e) => setTelefone(e.target.value)} 
            value={telefone || ""}
            />   
           
            </div>
        
        
        <button className="register--button" >Cadastrar</button>
    
       
        
    </form>


        </div>
        </div>
        {fornecedores.length >0 ?( 
           <table >
            <thead>
              <tr>
              <th>Codigo</th> 
              <th>Nome</th> 
              <th>Endereço</th>
              <th>Telefone</th>
             
              <th>Açoes</th>
              </tr>
             
              </thead>
              <tbody>
                {fornecedores.map(fornecedor => (<tr key={fornecedor.id}>
                  <td> {fornecedor.id}</td>
                  <td> {fornecedor.nome}</td>
                  <td> {fornecedor.endereco} </td>
                  <td> {fornecedor.telefone} </td>
                 
                  <td>
                    <div className="icons">
                    <i ><BiCommentEdit onClick={() => {editFornecedor(fornecedor)}} /></i> 
                    <i ><AiFillDelete className='delete' /></i> 
                     
                    </div>
                     
                  </td>
                
                </tr>))}
  
              </tbody>
             
              
              </table>
        ): (
      <p>Não foi encontrado esse produto </p>
    )}
      
    </div>
  )
}

export default Fornecedor