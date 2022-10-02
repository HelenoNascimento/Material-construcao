import React from 'react'
import { FcSearch, FcViewDetails } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import './ListaCompras.css'

const ListaCompras = ({compras}) => {
  console.log(compras)
  return (
    <div className="compras--container">
        <div className='lista--compras'>
        {compras.length >0 ? (
       
            <table >
              <thead>
                <tr>
                  <th>Numero Pedido</th> 
                  <th>Nome Fornecedor</th> 
                  <th>Total do pedido</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th>Açoes</th>
                </tr>
                </thead>
              <tbody>
                {compras.map(compra =>(
                  <tr key={compra.id}>
                    <td>{compra.id}</td>
                    <td>{compra.fornecedor.nome}</td>
                    <td>{compra.total}</td>
                    <td>{compra.status}</td>
                    <td>{compra.data}</td>
                    <td>
                    <div className="icons">
                    
                    <Link to={`/compra/${compra.id}`}> <i><FcSearch /></i></Link>
                   
                     
                    </div>
                    </td>

                  </tr>
                ))}

              </tbody>
              </table>
       
        ) : (
        <p>Sem pedidos de compras ainda</p>)
         }
    </div>
    </div>
    
  )
}

export default ListaCompras