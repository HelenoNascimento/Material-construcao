import React from 'react'
import { useEffect } from 'react'
import { FcCancel } from 'react-icons/fc'

import "./ItensVenda.css"

const ItensVenda = (vendas) => {

  
  return (
    <div>
        <h1>{vendas.vendas.cliente}</h1>
        {vendas ?( 
                        <table >
                          <thead>
                            <tr>
                         
                            <th>Produto</th> 
                            <th>Quantidade</th>
                            <th>Valor unitario</th> 
                            <th>Valor total</th> 
                        
                          
                            <th>Remover</th>
                            </tr>
                          
                            </thead>
                            <tbody>
                              {vendas.vendas.map(produto => (<tr key={produto.produto}>
                                
                                <td> {produto.produto}</td>
                                <td> {produto.quantidade} </td>
                                <td> R$: {produto.valor} </td>
                                <td> R$: {produto.valor * produto.quantidade} </td>
                              
                              
                                <td>
                                  <div className="icons">
                                  <i><FcCancel /></i>
                                  
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

export default ItensVenda