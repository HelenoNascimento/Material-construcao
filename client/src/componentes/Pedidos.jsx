import React from 'react'
import { FcSearch, FcViewDetails } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import Pedido from '../pages/Pedido/Pedido'
import "./Pedidos.css"
const Pedidos = ({pedidos}) => {

    /* <h3>Numero Pedido {pedido.id}</h3>
            <h4>Nome: {pedido.cliente.nome}</h4>
            <h4>Total: {pedido.total}</h4>
            <h4>Data: {pedido.data}</h4>*/

 const verPedido = () =>{
    
 }
  return (
    <div className='pedidos'>
        <div className="item-pedido">
            
        </div>

        {pedidos.length >0 ?( 
           <table >
            <thead>
              <tr>
              <th>Numero Pedido</th> 
              <th>Nome cliente</th> 
              <th>Total do pedido</th>
              <th>Data</th>
             
              <th>Açoes</th>
              </tr>
             
              </thead>
              <tbody>
                {pedidos.map(pedido => (<tr key={pedido.id}>
                  <td> {pedido.id}</td>
                  <td> {pedido.cliente.nome}</td>
                  <td>R$: {pedido.total},00</td>
                  <td> {pedido.data} </td>
                 
                  <td>
                    <div className="icons">
                    
                    <Link to={`/pedidos/${pedido.id}`}> <i><FcSearch /></i></Link>
                   
                     
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

export default Pedidos