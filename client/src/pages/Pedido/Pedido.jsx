import React, { useEffect, useMemo, useState } from 'react'
import PedidoService from '../../Service/PedidoService';
import { useLocation, useParams } from "react-router-dom"


import "./Pedido.css"

const Pedido = (idproduto) => {
const [pedido, setPedido] = useState({});


const {id} = useParams()

// **********************carrega o pedido pelo id ********************
useEffect(() => {
    const loadUltimoPedido = async () =>{
          const pedido = await PedidoService.getPedidoID(id);
          setPedido(pedido)
    }
    loadUltimoPedido();
 
  },[]) 
  console.log(pedido)
  if(!pedido){
    return <p>Pedido não encontrado</p>
  }
  return (
    
    <div className="pedido-container">
        {pedido.id == id ? (<>
          
            <div className='pedido-dados'> 
               
              <div className="pedido-pedido">
                    <div>
                      <span className='pedido-span'>Numero pedido:</span>
                      <span className='pedido-span'>{pedido.id}</span>
                      
                    </div>
                    
                    <div>
                    <span className='pedido-span'>Total</span>
                      <span className='pedido-span'>R$ {pedido.total},00</span>
                    </div>
                    <div>
                      <span className='pedido-span'>Data</span>
                      <span className='pedido-span'>{pedido.data }</span>
                    </div>
                 
                    
                    
                  
               </div>
               <div className="pedido-cliente">
                 <span>Dados Cliente</span>
                  <div>
                      <span>Nome</span>
                      
                      <input type="text" placeholder='Nome' value={pedido.cliente.nome || ""} disabled/>
                  </div>
                    <div>
                      <span>Endereco</span>
                      <input type="text" placeholder="Endereco" value={pedido.cliente.endereco || ""} disabled/>
                    </div>
                    <div>
                      <span>Telefone</span>
                      <input type="text" placeholder="Telefone" value={pedido.cliente.telefone || ""} disabled/>
                    </div>
                   
                  </div>
            </div>
           
        <div className="pedido-itens">

                <span>Itens do pedido</span>
                {pedido.Produtos.length >0 ?( 
           <table >
            <thead>
                <tr>
                    <th>Codigo Produto</th> 
                    <th>Produto</th>
                    <th>Valor venda</th>
                    <th>Quantidade</th>
                    <th>Valor total</th>
                </tr>  
              </thead>
              <tbody>
                {pedido.Produtos.map(pd => (
                    <tr key={pd.id}>
                        <td> {pd.id}</td>
                        <td> {pd.nome} </td>
                        <td> R$ {pd.valor} </td>
                        <td> {pd.ItemPedidos.quantidade} </td>
                        <td> R$ {pd.ItemPedidos.quantidade * pd.valor} </td>
                    </tr>))}
              </tbody>

              </table>
        ): (
      <p>Não foi encontrado esse produto </p>
    )}
        </div>
        </>) : (<>
             <p>Sem pedido</p>
        </>) }

      </div>
  )
}

export default Pedido