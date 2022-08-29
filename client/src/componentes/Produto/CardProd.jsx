import {useState,useEffect} from 'react'
import { AiFillDelete,AiFillEdit  } from 'react-icons/ai';
import { BiCommentEdit  } from 'react-icons/bi';
//BiCommentEdit
//AiFillEdit
import "./CardProd.css"
import Axios from "axios";
import Modal from '../Modal';


const CardProd = ({produtos,handleDelete,handleEdit}) => {
  const [proId, setProId] = useState();
  const [nome, setNome] = useState();
  const [ produtoi, setProdutoi] = useState();
  const hideOrShowModal = (display) =>{
    const modal = document.querySelector("#modal");
    if(display){
      modal.classList.remove("hide")
    }else{
      modal.classList.add("hide");
    }
  }

  


useEffect(() => {
  
 
 
}, [produtos])
  return (
    <div  className="card--container" >
     
      
            
        {produtos.length >0 ?( 
           <table >
            <thead>
              <tr>
              <th>Codigo</th> 
              <th>Nome</th> 
              <th>Descricao</th>
              <th>Fornecedor</th>
              <th>Valor Venda</th>
              <th>Quantidade</th>
              <th>Açoes</th>
              </tr>
             
              </thead>
              <tbody>
                {produtos.map(produto => (<tr key={produto.id}>
                  <td> {produto.id}</td>
                  <td> {produto.nome}</td>
                  <td> {produto.descricao} </td>
                  <td> {produto.fornecedor} </td>
                  <td> R$ {produto.valor}  </td>
                  <td> {produto.quantidade} </td>
                  <td>
                    <div className="icons">
                    <i onClick={() => {handleEdit(produto)}}><BiCommentEdit /></i> 
                    <i onClick={() => {handleDelete(produto.id)}}><AiFillDelete className='delete' /></i> 
                     
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

export default CardProd