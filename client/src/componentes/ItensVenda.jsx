import React from 'react'
import { useEffect } from 'react'

import "./ItensVenda.css"

const ItensVenda = (vendas) => {
    console.log(vendas.vendas)
  
  return (
    <div>
        <h1>{vendas.vendas.cliente}</h1>
        {vendas ?( 
                        <table >
                          <thead>
                            <tr>
                            <th>Cliente</th> 
                            <th>Produto</th> 
                            <th>Quantidade</th>
                        
                          
                            <th>Açoes</th>
                            </tr>
                          
                            </thead>
                            <tbody>
                              {vendas.vendas.map(produto => (<tr key={produto.produto}>
                                <td> {produto.cliente}</td>
                                <td> {produto.produto}</td>
                                <td> {produto.quantidade} </td>
                              
                              
                                <td>
                                  <div className="icons">
                                 
                                  
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