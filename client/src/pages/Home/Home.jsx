import React from 'react'
import { useEffect, useState } from 'react'
import ClienteService from '../../Service/ClienteService';
import ProdutoService from '../../Service/ProdutoService';
import PedidoService from '../../Service/PedidoService';
import "./Home.css"
import { FcBusinessman, FcClock, FcFilingCabinet, FcSurvey } from 'react-icons/fc';

const Home = () => {
  const [totalCliente, setTotalCliente] = useState();
  const [totalProdutos, setTotalProdutos] = useState();
  const [totalVendas, setTotalVendas] = useState();
  const [ultimasVendas, setUltimasVendas] = useState();

  useEffect (() =>{
      const carregaDados = async () =>{
        let clientes = await  ClienteService.getAllClientes();
        let produtos = await ProdutoService.getAllProdutos();
        let vendas = await PedidoService.getPedidos();
        let ultimas = await PedidoService.getUltimasVendas();
       
       
        setUltimasVendas(ultimas)

        setTotalVendas(vendas.length)
        setTotalProdutos(produtos.length)
        setTotalCliente(clientes.length)

        console.log(ultimasVendas)
       
      }

      carregaDados();
      
  },[])

  if(!ultimasVendas){
    return <p>Carregando...</p>
  }

  return (
    <div className='container'>
      
     <div className="esquerdo">
        <div className="linha--esquerda">
                <div className="item">
                    <span>Produtos <i><FcFilingCabinet /></i></span>
                    <span className='numero'>{totalProdutos}</span>
                </div>

                <div className="item">
                  <span>Vendas <i><FcSurvey /></i></span>
                <span className='numero'>{totalVendas}</span>
                </div>
                <div className="item">
                   <span>Clientes <i><FcBusinessman /></i></span>
                   <span className='numero'>{totalCliente}</span>
                </div>
        </div>
        
     </div>
     <div className="direito">
        <div className="ultimas--vendas">
            <span> Ultimas Vendas <i><FcClock /></i></span> 
            
            {ultimasVendas.length >0 ? (
              <>
               <table >
            <thead>
                <tr>
                    <th>Numero</th> 
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Data</th>
                </tr>  
              </thead>
             
              <tbody>
              {ultimasVendas.map(venda => (
              <tr key={venda.id}>
                  <td> {venda.id}</td>
                  <td> {venda.cliente.nome}</td>
                  <td>R$ {venda.total} </td>
                  <td> {venda.data} </td>
              </tr>
             ))}
              </tbody>

              </table>
              
              </>
            ) : (
              <>teste</>
            )}
         

        </div>
     </div>

    </div>
  )
}

export default Home