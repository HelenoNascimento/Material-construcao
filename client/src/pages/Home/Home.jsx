import React from 'react'
import { useEffect, useState } from 'react'
import ClienteService from '../../Service/ClienteService';
import ProdutoService from '../../Service/ProdutoService';
import PedidoService from '../../Service/PedidoService';
import "./Home.css"
import { FcBusinessman, FcClock, FcFilingCabinet, FcShipped, FcSurvey, FcTodoList } from 'react-icons/fc';
import CompraService from '../../Service/CompraService';
import FornecedorService from '../../Service/FornecedorService';

const Home = () => {
  const [totalCliente, setTotalCliente] = useState();
  const [totalProdutos, setTotalProdutos] = useState();
  const [totalVendas, setTotalVendas] = useState();
  const [totalFornecedores, setTotalFornecedores] = useState();
  const [totalCompras, setTotalCompras] = useState();
  const [comprasPendente, setComprasPendentes] = useState();
  const [ultimasVendas, setUltimasVendas] = useState();
  const [ultimasCompras, setUltimasCompras] = useState();


  useEffect (() =>{
      const carregaDados = async () =>{
        let clientes = await  ClienteService.getAllClientes();
        let produtos = await ProdutoService.getAllProdutos();
        let vendas = await PedidoService.getPedidos();
        let ultimas = await PedidoService.getUltimasVendas();
        let ulCompras = await CompraService.getUltimasCompras();
        let fornecedores = await FornecedorService.getAllFornecedores();
        let compras = await CompraService.getAllCompras();
        let pendent = await CompraService.getComprasPendentes();
       console.log(ulCompras)
        setUltimasVendas(ultimas)
        setUltimasCompras(ulCompras)
        setTotalVendas(vendas.length)
        setTotalProdutos(produtos.length)
        setTotalCliente(clientes.length)
        setTotalFornecedores(fornecedores.length)
        setTotalCompras(compras.length);
       setComprasPendentes(pendent.length)
       

        console.log(comprasPendente)
       
      }
      console.log(comprasPendente)
      carregaDados();
      
  },[])

  if(!ultimasVendas){
    return <p>Carregando...</p>
  }
  if(!ultimasCompras){
    return <p>Carregando...</p>
  }
  return (
    <div className='container--home'>
      
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
        <div className="linha--esquerda">
                <div className="item">
                    <span>Fornecedores <i><FcShipped /></i></span>
                    <span className='numero'>{totalFornecedores}</span>
                </div>

                <div className="item">
                  <span>Total compras <i><FcTodoList /></i></span>
                <span className='numero'>{totalCompras}</span>
                </div>
                <div className="item">
                   <span>Compras pendentes </span>
                   <span className='numero'>{comprasPendente}</span>
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
        <div className="ultimas--compras">
        <span> Ultimas Compras <i><FcClock /></i></span> 
        {ultimasCompras.length >0 ? (
              <>
               <table >
            <thead>
                <tr>
                    <th>Numero</th> 
                    <th>Fornecedor</th>
                    <th>Total</th>
                    <th>Data</th>
                    <th>Status</th>
                </tr>  
              </thead>
             
              <tbody>
              {ultimasCompras.map(compra => (
              <tr key={compra.id}>
                  <td> {compra.id}</td>
                  <td> {compra.fornecedor.nome}</td>
                  <td>{compra.total} </td>
                  <td> {compra.data} </td>
                  <td> {compra.status} </td>
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