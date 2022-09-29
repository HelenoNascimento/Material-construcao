
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import CompraService from '../../Service/CompraService'
import "./CompraPedido.css"

const CompraPedido = () => {
    const {id} = useParams()

    const [compra, setCompra] = useState({})

    useEffect(() =>{
        const carregaCompra = async () => {

            let compra = await CompraService.getCompraById(id)
            
            setCompra(compra)
           
        }
        carregaCompra();
    },[])
if(!compra){
    <p>Carregando</p>
}
console.log(compra)
  return (
    <div className='container--pedidoCompra'>
          <div className='dados-pedido'>
                <div className='campo'>
                    <span>Compra  </span>
                    <input type="text" placeholder='Compra' disabled value={compra.id || ""}/>
                </div>
                <div className='campo'>
                    <span>Total </span>
                    <input type="text" placeholder='Total'disabled value={compra.total || ""}/>
                </div>
                <div className='campo'>
                    <span>Data </span>
                    <input type="text" placeholder='Data' disabled value={compra.data || ""}/>
                </div>
                
                <div className='campo'>
                    <span>status </span>
                     <input type="text" placeholder='Data' disabled value={compra.status || ""}/>
                </div>
                
          </div>
        <div className="dados-fornecedor">
       
        <div className='campo'>
            <span>Fornecedor </span>
            <input type="text" placeholder='Fornecedor' disabled />
        </div>
        <div className='campo'> 
             <span>Telefone </span>
             <input type="text" placeholder='Telefone' disabled />
        </div>
        <div className='campo'> 
            <span>Endereco </span>
             <input type="text" placeholder='Endereco' disabled />
        </div>
          
        </div>
        <div className="itens-compra">

        </div>

    </div>
  )
}

export default CompraPedido