
import "./CadastroPro.css";
import React, {useState, useEffect} from 'react'

import Axios from "axios";

const CadastroPro = () => {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [valor, setValor] = useState("");
    const [produtos, setProdutos] = useState("");

    


 
    const handleClickButton = async (e) =>{
        e.preventDefault();
       
        console.log(nome, descricao, quantidade)
       Axios.post("http://localhost:3001/produto/register",{
            nome: nome,
            descricao: descricao,
            quantidade: quantidade,
            fornecedor: fornecedor,
            valor: valor,
        }).then((response) =>{
            console.log(response);
        }).catch(function (error) {
            console.log(error);
          });

          setNome("");
          setDescricao("");
          setQuantidade("");
          setFornecedor("");
          setQuantidade("");
          setValor("");
    }


  return (
   
         <form onSubmit={handleClickButton} className="formulario">
        <div className='input_container' >
            <label>Nome:</label>
            <input type="text" placeholder="Nome" 
            onChange={(e) => setNome(e.target.value)} value={nome || ""}/>   
        </div>
        <div className='input_container'> 
            <label>Descricao:</label>
            <input type="text" placeholder="Descricao" 
            onChange={(e) => setDescricao(e.target.value)} value={descricao || ""} />   
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
        <div className='input_container'>
            <label>Fornecedor:</label>
            <input type="text" placeholder="Fornecedor"
             onChange={(e) => setFornecedor(e.target.value)} value={fornecedor || ""}/>   
        </div>
        <div className='input_container'>
            <label>Valor :</label>
            <input type="text" placeholder="Valor" 
            onChange={(e) => setValor(e.target.value)} value={valor || ""}/>   
        </div>
        <button className="register--button" >Cadastrar</button>
        
       
        
    </form>
   
  )
}

export default CadastroPro