
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import CompraService from '../../Service/CompraService'
import "./CompraPedido.css"

const CompraPedido = () => {
    const {id} = useParams()

    const [compra, setCompra] = useState({})

    //dados fornecedor
    const [nomeFornecedor, setNomeFornecedor] = useState("");
    const [telefoneFornecedor, setTelefoneFornecedor] = useState("");
    const [enderecoFornecedor, setEnderecoFornecedor] = useState("");

    const [status, setStatus] = useState("");

    useEffect(() =>{
        const carregaCompra = async () => {

            let compr = await CompraService.getCompraById(id)
            setNomeFornecedor(compr.fornecedor.nome)
            setEnderecoFornecedor(compr.fornecedor.endereco);
            setTelefoneFornecedor(compr.fornecedor.telefone);
            setCompra(compr)
           
        }
        carregaCompra();
    },[])

    useEffect(()=>{
        console.log(status)
    },[status])
if(!compra){
    <p>Carregando</p>
}
if(!compra.fornecedor){
    <p>Carregando</p>
}
console.log()
  return (
    <div className='container--pedidoCompra'>
        
              <div className='container-dados'>
                   


                <div className='dados-pedido'>
                        <div className='campo'>
                            <span className='span-pedido'>Compra  </span>
                            <span className='span-pedido'>{compra.id}</span>
             
                        </div>
                        <div className='campo'>
                            <span className='span-pedido'>Total </span>
                            <span className='span-pedido'>R$ {compra.total},00</span>
                            
                        </div>
                        <div className='campo'>
                            <span className='span-pedido'>Data </span>
                            <span className='span-pedido'>{compra.data}</span>
                          
                        </div>
                        
                        <div className='campo'>
                            <span className='span-pedido'>status </span>
                            <select name="select" onChange={(e) => setStatus(e.target.value)}>
                                <option value={compra.status}>{compra.status}</option>
                                <option value="Entregue" >Entregue</option>
                            </select>
                        </div>
                        
                </div>
                <div className="dados-fornecedor">
                        
                        <div className='campo'>
                            <span>Fornecedor </span>
                            <input type="text" placeholder='Fornecedor' disabled value={nomeFornecedor || ""}/>
                        </div>
                        <div className='campo'> 
                                <span>Telefone </span>
                                <input type="text" placeholder='Telefone' disabled value={telefoneFornecedor || ""}/>
                        </div>
                        <div className='campo'> 
                            <span>Endereco </span>
                                <input type="text" placeholder='Endereco' disabled value={enderecoFornecedor || ""}/>
                        </div>
                            
                </div>
                  
           
        </div>
        
        <div className="itens-compra">
        <span>Itens do pedido</span>
                {compra.Produtos ?( 
           <table >
            <thead>
                <tr>
                    <th>Codigo Produto</th> 
                    <th>Produto</th>
                    <th>Valor</th>
                    <th>Quantidade</th>
                    <th>Valor total</th>
                </tr>  
              </thead>
              <tbody>
                {compra.Produtos.map(item => (
                    <tr key={item.id}>
                         <td>{item.id} </td>
                        <td>{item.nome} </td>
                        <td> R$ {item.valor}</td>
                        <td> {item.ItemCompra.quantidade}</td>
                        <td> R$ {item.ItemCompra.quantidade * item.valor}</td>
                    </tr>))}
              </tbody>

              </table>
        ): (
      <p>Não foi encontrado esse produto </p>
    )}           
        </div>

    </div>
  )
}

export default CompraPedido