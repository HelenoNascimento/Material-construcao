import {useState,useEffect} from 'react'
import { AiFillDelete  } from 'react-icons/ai';
import "./CardProd.css"
import Axios from "axios";


const CardProd = ({produtos,handleDelete}) => {


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
                  <td> <i onClick={() => {handleDelete(produto.id)}}><AiFillDelete  /></i> </td>
                
                </tr>))}
  
              </tbody>
             
              
              </table>
        ): (
      <p>Não tem tarefas cadastradas </p>
    )}
    
    </div>
  )
}

export default CardProd