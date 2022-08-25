import React, {useState, useEffect} from 'react'
import "./Produto.css"
import Axios from "axios";
import CardProd from '../../componentes/Produto/CardProd';
import Message from '../../componentes/Message';
import CadastroPro from '../../componentes/Produto/CadastroPro';




const Produto = () => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [valor, setValor] = useState("");
    const [produtos, setProdutos] = useState("");

    const [cadastrar , setCadastrar] = useState(false);

    
    const handleCadastrar = (e) =>{
        e.preventDefault();
        setCadastrar(true);
        
    }
    const handleListar = (e) =>{
        e.preventDefault();
        setCadastrar(false);
       
    }

 

    useEffect(() => {
        Axios.get("http://localhost:3001/produto").then((response)=>{
            setProdutos(response.data);
        })
        console.log(produtos)
    }, [cadastrar])

  return (
    <div className="container-produto">
        <div className="row-buttons"> 
        <button className="register--button" onClick={handleCadastrar}>Produtos</button>
       <button className="register--button" onClick={handleListar}>Cadastrar</button>
        
        </div>
       
      
       
      
        {cadastrar === false ? ( < > <CadastroPro /> </> ): (
            <div className="lista-produtos">
            {produtos && produtos.map((produto) =>(
               <CardProd 
              key={produto.id}
              nome={produto.nome}
              descricao={produto.descricao}
              quantidade={produto.quantidade}
              fornecedor={produto.fornecedor}
              valor={produto.valor}
              
              /> 
            ))} 
        </div>
                )}
              
           
      
        
        
        
    
    </div>
  )
}

export default Produto