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
    const [consulta, setConsulta] = useState("");

    const [cadastrar , setCadastrar] = useState(false);

    
    const handleCadastrar = (e) =>{
        e.preventDefault();
        setCadastrar(false);
        
    }
    const handleListar = (e) =>{
        e.preventDefault();
        setCadastrar(true);
       
    }
        if(consulta.length >2){
                console.log("pesuisando "+ consulta)
            Axios.post("http://localhost:3001/produto/pesquisa",{
                nome: consulta,
            }).then((response)=>{
                setProdutos(response.data);
                setConsulta("")
            })
        }

 const handlePesquisar  = (e) =>{
    e.preventDefault();
    
    console.log("pesuisando "+ consulta)
    Axios.post("http://localhost:3001/produto/pesquisa",{
        nome: consulta,
    }).then((response)=>{
        setProdutos(response.data);
    })
        
    }

    const handleConsultar = (e) =>{
        e.preventDefault();
       // setConsultar(true);
 }
 const handleDelete = (id) =>{
    //e.preventDefault();
      console.log(id)
      Axios.post("http://localhost:3001/produto/delete",{
            id: id,
        }).then((response)=>{
            setProdutos(produtos.filter((produto) => produto.id !== id));
           
        })
    
        
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
       
      
       
      
        {cadastrar === true ? ( < > <CadastroPro /> </> ): (
            <div className="lista-produtos">

            <div className="row-pesquisa"> 
            
                    <input type="text" placeholder="Digite o nome do material" 
                    onChange={(e) => setConsulta(e.target.value)}/>
                    <button onClick={handlePesquisar}>Pesquisar</button>
              </div>
            
             <div className="row-lista"> 
               <CardProd produtos={produtos}
                handleDelete={handleDelete}
              /> 
               </div>
           
        </div>
                )}
              
           
      
        
        
        
    
    </div>
  )
}

export default Produto