import React from 'react'

import "./CardProd.css"

const CardProd = ({produtos}) => {
  return (
    <div  className="card--container" >
      
               
        {produtos.length >0 ?( 
           <table style={{ width: 500 }}>
            <thead>
              <tr>
              <th>Nome</th> 
              <th>Descricao</th>
              <th>Fornecedor</th>
              <th>valor</th>
              <th>Quantidade</th>
              </tr>
             
              </thead>
              <tbody>
                {produtos.map(produto => (<tr> {produto.nome}
                
                  <td> {produto.descricao} </td>
                  <td> {produto.fornecedor} </td>
                  <td> {produto.valor} </td>
                  <td> {produto.quantidade} </td>
                
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