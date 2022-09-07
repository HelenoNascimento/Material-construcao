
import React, {useState, useEffect} from 'react'
import ItensVenda from '../../componentes/ItensVenda';
import ClienteService from '../../Service/ClienteService';
import ProdutoService from '../../Service/ProdutoService';
import PedidoService from '../../Service/PedidoService';
import Cliente from '../Cliente/Cliente';
import "./Vendas.css"
import Select from 'react-select'
import Pedidos from '../../componentes/Pedidos';


const closeModal = ()=>{
  const modal = document.querySelector('#modal-vendas');
  modal.classList.add("hide-vendas")
}


const Vendas = () => {
//produtos e clientes
const[lsitaProdutos,setListaProdutos] =  useState("")
const[listaClientes,setListaClientes] = useState("");

//dados cliente
const [ idcli, setIdCliente ] = useState("");
const [nome, setNome] = useState("")
const [endereco, setEndereco] = useState("")
const [telefone, setTelefone] = useState("")
const [listaCli, setlistaCli] = useState("");

//dados produto
const [ nomePro, setNomePro] = useState("") 
const [ idPro, setIdPro] = useState("")
const [ descricao, setDescricao] = useState("")
const [ valor, setValor] = useState("")
const [quantidadePro ,setQuantidadePro] = useState("")

const [teste, setTeste] = useState(false)
const [produto, setProduto] = useState("");
const [quantidade, setQuantidade] = useState("");
const [cliente, setCliente] = useState("");

const  [vendas,setVendas] = useState([]);
const  [novoPedido, setNovoPedido] = useState(true);


//ultimo pedido
const [ultimoPedido, setUltimoPedido] = useState("");
const [ultimoPed, setUltimoPed] = useState(false);

const [todosPedidos, setTodosPedidos] = useState({})

let qnt = 0;

const listaC = [];
useEffect(() => {


  const loadAll = async () =>{
  const prod = await ProdutoService.getAllProdutos();
  const client= await ClienteService.getAllClientes();
 setListaClientes(client)
 setlistaCli(client)
 setListaProdutos(prod)
 const todosPedidos = await PedidoService.getPedidos();
setTodosPedidos(todosPedidos)

}

//setLoading(false)
loadAll();

},[]) 

useEffect(() => {
  const loadAll2 = async () =>{
  const produtoID = await ProdutoService.getProdutoById(produto);
  //const client= await ClienteService.getAllClientes();
 //setListaClientes(client)
// setListaProdutos(prod)

setIdPro(produtoID[0].id)
setNomePro(produtoID[0].nome)
setQuantidadePro(produtoID[0].quantidade)
setDescricao(produtoID[0].descricao)
setValor(produtoID[0].valor)
/// carrega produto pelo ID
//console.log(produtoID[0].nome);
  }

  loadAll2();
 
},[produto]) 

useEffect(() => {
  const loadcliente = async () =>{
 const clienteID = await ClienteService.getClientById(cliente);
  const todosPedidos = await PedidoService.getPedidos();
  setTodosPedidos(todosPedidos)
 // console.log(todosPedidos)
  setNome(clienteID.nome)
  setEndereco(clienteID.endereco)
  setTelefone(clienteID.telefone)
  setIdCliente(clienteID.idCliente) 
  //console.log(clienteID);
  }
  loadcliente();
},[cliente]) 


// **********************carrega ultimo pedido ********************
useEffect(() => {
  const loadUltimoPedido = async () =>{
        const ultimo = await PedidoService.ultimoPedido();
        setUltimoPedido(ultimo[0].id)
  }
  loadUltimoPedido();
},[ultimoPed]) 
//console.log(ultimoPedido)

//console.log(listaClientes)
//console.log(lsitaProdutos)

const handleVendas = (e) =>{

  if(novoPedido){
    const pedido = {
      idClient: cliente,
      total: 0,
      data: "25/05/2015"
    }
    setUltimoPed(true)
    setNovoPedido(false)
  
    //console.log(pedido)
    PedidoService.novoPedido(pedido) 
   // ultimoPedido(PedidoService.ultimoPedido());

    console.log("Ultimo")
    //console.log(ultimoPedido)
  }
  console.log("Ultimo")
  console.log(ultimoPedido)
  if(ultimoPedido === undefined){
    setUltimoPedido(1)
  }
  const novoItemPedido = {
      quantidade: quantidade,
      valor_item: valor,
      idProduto: idPro,
      idPedido: ultimoPedido+1
  }
  PedidoService.novoItemPedido(novoItemPedido);
 
  setVendas([...vendas,{
    idClient: cliente, 
    nome: nome, 
    produto: nomePro, 
    valor: valor, 
    quantidade: quantidade
    
  }])
  qnt ++


setTeste(true)
setUltimoPed(false)

}
//console.log(vendas)


if(listaCli){
  let cont =0 ;
  listaCli.forEach(cliLista => {
      
      
    listaC[cont] =  { value: cliLista.id, label: cliLista.nome }
     cont ++
   });
  }
  console.log("aa")
 console.log(todosPedidos)

const hideOrShowModal = (display) =>{
  const modal = document.querySelector('#modal-vendas');
    if(display){
      modal.classList.remove("hide-vendas")
    }else{
      modal.classList.add("hide-vendas")
    }
}

const abrirModal = (produto) =>{
  // setProdutoUpdate(produto)
   hideOrShowModal(true)
   
 }

 if(!todosPedidos){
  return <p>carregando</p>
 }


  return (
    <div className='vendas-container'>
      
      <div className="row"> 
        <button onClick={abrirModal}>Vender</button>
      </div>
        <div id="modal-vendas" className="hide-vendas">
            <div className="fade-vendas" onClick={closeModal}></div>
            <div className="modal-vendas">
          
                <div className='vendas-client'>
                 
                <div className='pesq-produto'>
                <h2>Dados Cliente</h2>
                <Select   options={listaC} placeholder="Clientes" className="pesquisaForne"  
                          onChange={(e) => setCliente(e.value)}
                          />
                      
                    
                </div>
             
                     
                      <div className="row-produto">
                       
                              <label className='label-nome'>Nome:</label>
                            <input type="text"  placeholder="Nome" disabled value={nome || ""}/>       
                   
                        
                              <label>Telefone:</label>
                            <input type="text"  placeholder="Telefone" disabled value={telefone || ""}/>       
                        
                        
                              <label>Endereco:</label>
                            <input type="text"  placeholder="Endereco" disabled value={endereco || ""}/>       
                        


                     </div>
                    
                      </div>
                      
                
                <div className="vendas-produto">
                      <div className='pesq-produto'>
                      <label>Produto</label>
                        <input type="text" placeholder='Codigo do produto' onChange={(e) => setProduto(e.target.value)}/>
                      </div>
                      <div className="row-produto">
                            <label> Nome</label>
                            <input type="text" placeholder="Nome" disabled value={nomePro || ""}/>
                            <label> Descricao</label>
                            <input type="text" placeholder="Descricao" disabled value={descricao || ""} />
                            <label> Valor</label>
                            <input type="text" placeholder="Valor"  className='input-numerico'disabled value={valor || ""}/>
                            <label> Qnt Estoque</label>
                            <input type="text" placeholder="Quantidade" className='input-numerico' disabled value={quantidadePro || ""}/>
                      </div>
                      <div className="row-adicionar">
                        <label>Quantidade</label>
                        <input type="text" placeholder="Quantidade" className="input-numerico" onChange={(e) => setQuantidade(e.target.value)}/>
                        <button onClick={handleVendas}>Adicionar</button>
                      </div>

                      <div className="row-lista-vendas">

                        {vendas && 
                            <ItensVenda vendas={vendas} key={vendas.produto}/>
                        }
                        
                      
                      

                      </div>

                </div>
                
            </div>
            
        </div>
        <div className='pedidos'>
       
        {todosPedidos.length >0 ?(
       
            <>
            <Pedidos pedidos={todosPedidos}/>
            
          </>
         
        ) :(<>
        <p>Ainda não tem nenhuma venda :c</p>
        
        </>)}

       
        

        </div>
    </div>
  )
}

export default Vendas