import React from 'react'
import "./Cliente.css"

import { AiFillDelete,AiFillEdit  } from 'react-icons/ai';
import { BiCommentEdit  } from 'react-icons/bi';

import {useState,useEffect} from 'react'
import ClienteService from '../../Service/ClienteService';


const closeModal = ()  =>{
  const modal = document.querySelector("#modal-client");
  modal.classList.add("hide-client");
};



const Cliente = () => {
  const [ nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [atualizar, setAtualizar] = useState(false);
  const [ clientes, setClientes] = useState("");

  
  const hideOrShowModal = (display) =>{
    const modal = document.querySelector("#modal-client");
    if(display){
      modal.classList.remove("hide-client")
    }else{
      modal.classList.add("hide-client");
    }
  }

  const abrirModal = (produto) =>{
    // setProdutoUpdate(produto)
     hideOrShowModal(true)
     
   }

   
const cadastrarCliente = (e) =>{
  e.preventDefault();
   const newCliente = {
    nome: nome,
    endereco: endereco,
    telefone: telefone,
   }
   ClienteService.cadastrarCliente(newCliente);
   setNome("");
   setEndereco("");
   setTelefone("");
   setAtualizar(true)
}

useEffect(() => {
  const carregaClientes= async() =>{
        const resultado = await ClienteService.getAllClientes();
        setClientes(resultado);
       //console.log(resultado)
        console.log(clientes)
  }
  carregaClientes();
},[atualizar])

  return (
    <div className='container--cliente'>
      <div className="row"> 
        <button onClick={abrirModal}>Cadastrar Cliente</button>
      </div>
        <div id="modal-client" className="hide-client">
              <div className="fade-client" onClick={closeModal}> </div>
              <div className="modal-client">
                  <h2>Cadastrar Cliente:</h2>
                      <form className="formulario" onClick={cadastrarCliente}>
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
                                <input type="text"  placeholder="Telefone"  
                                onChange={(e) => setTelefone(e.target.value)} 
                                value={telefone || ""}
                                />   
                              
                                </div>
                            
                            
                            <button className="register--button" >Cadastrar</button>
                        
                          
                            
                        </form>

              </div>
        </div>
        {clientes.length >0 ?( 
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
                {clientes.map(cliente => (<tr key={cliente.id}>
                  <td> {cliente.id}</td>
                  <td> {cliente.nome}</td>
                  <td> {cliente.endereco} </td>
                  <td> {cliente.telefone} </td>
                 
                  <td>
                    <div className="icons">
                    <i ><BiCommentEdit onClick={() => {abrirModal(cliente)}} /></i> 
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

export default Cliente