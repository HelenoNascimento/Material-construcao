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
  const [cidade , setCidade] = useState("");
  const [numero, setNumero] = useState("");
  const [atualizar, setAtualizar] = useState(false);
  const [cep, setCep] = useState("");
  const [ clientes, setClientes] = useState("");

  const [dadosCep, setDadosCep] = useState("");

  //dados de pesquisa
  const [pesquisaNome, setPesquisaNome] = useState("");
  const [pesquisaCodigo, setPesquisaCodigo] = useState("");

  
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

//pesquisando endereco
useEffect(()=>{
  const url = `https://viacep.com.br/ws/${cep}/json/`
 if(cep.length ==8){
  const carrega = async() =>{
    const req = await fetch(url)
    const json  =await req.json();        
   //console.log(json)
   setDadosCep(json)
  }
  carrega();
  
console.log(dadosCep.logradouro)
 }

},[cep])


//pesquisando client
useEffect(() =>{
  const pesquisar = async() =>{
    let resultado = await ClienteService.getClienteNome(pesquisaNome);
    setClientes(resultado);
  }
  pesquisar();
},[pesquisaNome])


  return (
    <div className='container--cliente'>
      <div className="row"> 
        
        <span>Nome cliente</span>
        <input type="text" placeholder="Cliente"  onChange={(e) => setPesquisaNome(e.target.value)} />
        
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
                                <label>Telefone:</label>
                                <input type="text"  placeholder="Telefone"  
                                onChange={(e) => setTelefone(e.target.value)} 
                                value={telefone || ""}
                                />   
                                </div>
                            <div className='input_container'> 
                                <label>Cep:</label>
                                <input type="text" placeholder="CEP" 
                                onChange={(e) => setCep(e.target.value)} 
                                />   
                            </div>
                            <div className='input_container'> 
                                <label>Endereço:</label>
                                <input type="text" placeholder="Endereço" 
                                onChange={(e) => setEndereco(e.target.value)} value={dadosCep.logradouro || ""} 
                                disabled
                                />   
                            </div>
                            <div className='input_container'> 
                                <label>Cidade:</label>
                                <input type="text" placeholder="Cidade" 
                                onChange={(e) => setCidade(e.target.value)} value={dadosCep.localidade || ""} 
                                disabled
                                />   
                            </div>
                            <div className='input_container'> 
                                <label>Numero:</label>
                                <input type="text" placeholder="Numero" 
                                onChange={(e) => setNumero(e.target.value)} value={endereco || ""} 
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