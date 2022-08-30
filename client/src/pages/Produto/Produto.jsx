import React, {useState, useEffect} from 'react'
import "./Produto.css"
import Axios from "axios";
import CardProd from '../../componentes/Produto/CardProd';
import Message from '../../componentes/Message';
import CadastroPro from '../../componentes/Produto/CadastroPro';
import Modal from '../../componentes/Modal';
import ProdutoService from '../../Service/ProdutoService';
import { useSelector, useDispatch } from "react-redux";

//import { getAllProdutos } from "../../Service/ProdutoService";




const Produto = () => {

    const [produtos, setProdutos] = useState("");
    const [consulta, setConsulta] = useState("");

    const [ loading, setLoading] = useState(true);

    const [produtoUpdate, setProdutoUpdate] = useState("");

    const [cadastrar , setCadastrar] = useState(false);




    const hideOrShowModal = (display) =>{
        const modal = document.querySelector("#modal");
        if(display){
          modal.classList.remove("hide")
        }else{
          modal.classList.add("hide");
        }
      }

    const editProduto = (produto) =>{
      setProdutoUpdate(produto)
      hideOrShowModal(true)
      
    }
 
    
    const handleCadastrar = (e) =>{
        e.preventDefault();
        setCadastrar(false);
        
    }
    const handleListar = (e) =>{
        e.preventDefault();
        setCadastrar(true);
       
    }
    

    



 const handlePesquisar  = async (e)  =>{
  e.preventDefault();
      
    setProdutos(ProdutoService.PesquisaProduto(consulta))
    //pesquisar()
    console.log("pesuisando "+ consulta)
    
        
    }

    
 const handleDelete = (id) =>{
   
      console.log(id)
      ProdutoService.deleteProduto(id);
      setProdutos(produtos.filter((produto) => produto.id !== id));
     
    }
    
 
    useEffect(() => {

        const loadAll = async () =>{
        const prod = await ProdutoService.getAllProdutos();
        setProdutos(prod)
      }
   
     setLoading(false)
     loadAll();
    }, [cadastrar])

    useEffect(() => {

      const pesquisar = async() =>{
        
    
       let consultar = await await ProdutoService.getProdutoById(consulta)
        setProdutos(consultar)
      
        if(!isNaN(consulta)){
          console.log("Numero")
          console.log(consulta)
          consultar = await ProdutoService.getProdutoById(consulta)
          setProdutos(consultar)
          console.log(produtos)
        }else{
          console.log("string")
          console.log(consulta)
           consultar = await ProdutoService.PesquisaProduto(consulta)
           setProdutos(consultar)
           console.log(produtos)
        }
    
     
      
    
  
      
       }
   
    
   setLoading(false)
   pesquisar();
  }, [consulta])


    if(loading){
      return <p>Carregando...</p>
    }


  return (
    <div className="container-produto">
        { produtoUpdate &&
        <Modal  handleEdit={editProduto} produtoUpdate={produtoUpdate}/>
        }
           
        <div className="row-buttons"> 
        <button className="register--button" onClick={handleCadastrar}>Produtos</button>
       <button className="register--button" onClick={handleListar}>Cadastrar</button>
        
        </div>
       
      
       
      
        {cadastrar === true ? ( < > <CadastroPro /> </> ): (
            <div className="lista-produtos">

            <div className="row-pesquisa"> 
            
                    <input type="text" placeholder="Digite o nome ou codigo " 
                    onChange={(e) => setConsulta(e.target.value)}/>
                    <button onClick={handlePesquisar}>Pesquisar</button>
              </div>
            
             <div className="row-lista"> 
             
             {produtos && 
             <CardProd produtos={produtos}
             handleDelete={handleDelete}
             handleEdit={editProduto}  /> 
             }
               
      
               </div>
           
        </div>
                )}
              
           
      
        
        
        
    
    </div>
  )
}

export default Produto