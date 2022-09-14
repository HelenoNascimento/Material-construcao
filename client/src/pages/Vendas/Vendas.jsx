
import React, {useState, useEffect} from 'react'
import ItensVenda from '../../componentes/ItensVenda';
import ClienteService from '../../Service/ClienteService';
import ProdutoService from '../../Service/ProdutoService';
import PedidoService from '../../Service/PedidoService';
import { FcCancel } from 'react-icons/fc'
import Cliente from '../Cliente/Cliente';
import "./Vendas.css"
import Select from 'react-select'
import Pedidos from '../../componentes/Pedidos';
const today = new Date();

const closeModal = ()=>{
  const modal = document.querySelector('#modal-vendas');
  modal.classList.add("hide-vendas")
}


const Vendas = () => {

  //recarregar vendas
const[recarregar, setRecarregar] = useState(false)

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


const [produto, setProduto] = useState("");
const [quantidade, setQuantidade] = useState("");
const [cliente, setCliente] = useState("");

const  [vendas,setVendas] = useState([]);
const  [novoPedido, setNovoPedido] = useState(true);
const [ totalPedido, setTotalPedido] = useState("");


//dados pedido
const [ultimoPedido, setUltimoPedido] = useState("");
const [ultimoPed, setUltimoPed] = useState(false);
const [controlaTotal, setControlaTotal] = useState(false);
const [todosPedidos, setTodosPedidos] = useState({})


//dados do pedid
  const [itemPedido, setItemPedido] = useState([]);

// dados busca pedidos
const [buscaIdPedido, setBuscaIdPedido] = useState();
const [buscaNomePedido, setBuscaNomePedido] = useState();
const [ idClientePedido, setIdClientePedido] = useState();
const listaC = [];



//carrega dados
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
  loadAll();
  },[recarregar]) 


  //carrega pedidos do ID
useEffect(() => {
  const carrePedidoID = async () =>{
    const todosPedidos = await PedidoService.buscadoPedidoID(buscaIdPedido)
    setTodosPedidos(todosPedidos);
    console.log("aa")
    console.log(todosPedidos)
  }
 
  carrePedidoID()
},[buscaIdPedido])

useEffect(() => {
  const loadAll2 = async () =>{
  const produtoID = await ProdutoService.getProdutoById(produto);


setIdPro(produtoID[0].id)
setNomePro(produtoID[0].nome)
setQuantidadePro(produtoID[0].quantidade)
setDescricao(produtoID[0].descricao)
setValor(produtoID[0].valor)

  }

  loadAll2();
 
},[produto]) 


//*****************Carrega dados do cliente*************** */
useEffect(() => {
  const loadcliente = async () =>{
 const clienteID = await ClienteService.getClientById(cliente);
  const todosPedidos = await PedidoService.getPedidos();
  setTodosPedidos(todosPedidos)

  setNome(clienteID.nome)
  setEndereco(clienteID.endereco)
  setTelefone(clienteID.telefone)
  setIdCliente(clienteID.idCliente) 

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

//**************************carrega pedidos por nome cliente ***************** */
useEffect(()=>{
  
  const loadPedidoCliente = async () =>{
      if(buscaNomePedido != ""){
        const cliente = await ClienteService.getClienteNome(buscaNomePedido)
        const idCliente = cliente[0].id
         setIdClientePedido(idCliente)
         console.log(cliente)
         console.log(idCliente)
      }
     
  }
loadPedidoCliente();
},[buscaNomePedido])
  useEffect(()=> {
        const loadPedidoCliente2 = async() =>{
          if(idClientePedido != undefined){
            const pedidosCliente = await PedidoService.buscaPedidoCliente(idClientePedido);

          if(pedidosCliente){
            setTodosPedidos(pedidosCliente) 
            }
        }
     }
  loadPedidoCliente2();
  },[idClientePedido])

//****busca ultimo pedido */
const loadUltimoPedido = async () =>{
  const ultimo = await PedidoService.ultimoPedido();
  return ultimo
  }

  /// Adiciona item na venda ****************
const handleVendas = (e) =>{

  setItemPedido([...itemPedido,{
    quantidade: quantidade,
      valor_item: valor,
      idProduto: produto,
      idPedido: ultimoPedido+1
  }])
 // PedidoService.novoItemPedido(novoItemPedido);
 let controleItemVenda = 0;

 const novoItemVenda = vendas.map((item, index, array) => {
  
 if(item.idProduto == produto){
  item.quantidade = parseInt(item.quantidade) + parseInt(quantidade)
  item.totalDoItem= parseInt(item.quantidade) * parseInt(item.valor)
  console.log("entrou aqui")
  setControlaTotal(true)
  atualizaTotal();
  controleItemVenda = 1
  return

 }

  
})
if(controleItemVenda ===0 ){
  setVendas([...vendas,{
    idProduto: produto,
    idClient: cliente, 
    nome: nome, 
    produto: nomePro, 
    valor: valor, 
    quantidade: quantidade,
    totalDoItem: valor * quantidade
    
  }])
  //setTotalPedido(totalPedido+= (quantidade*valor))
}



setUltimoPed(false)
setControlaTotal(false)
}
//**********************Atualiza total do pedido **************** */
const atualizaTotal = () =>{
  let total = 0
  vendas.forEach(item =>{
    total += item.totalDoItem
   
  })
  setTotalPedido(total)
}
useEffect(() =>{
  let total = 0
  vendas.forEach(item =>{
    total += item.totalDoItem
    console.log(item)
  })
  setTotalPedido(total)
},[vendas,controlaTotal])

//***************deletando item da  a Venda ****************** */

const handleDelete = (id) =>{
  console.log(id)
   setVendas(vendas.filter((item) => item.idProduto !== id));
   console.log(vendas)
   id = 0
  
}

//***************Realizado a venda item da  a Venda ****************** */
const handleFinalizar =() =>{
  console.log(itemPedido)

    const pedido = {
      idClient: cliente,
      total: totalPedido,
      data: today.toLocaleDateString()
    }

    
    //console.log(pedido)
   PedidoService.novoPedido(pedido) 
   
    
console.log(ultimoPedido)
  vendas.forEach(item => {
    const novoItemPedido = {
      quantidade: item.quantidade,
      valor_item: item.valor,
      idProduto: item.idProduto,
      idPedido: ultimoPedido+1
  }
  PedidoService.novoItemPedido(novoItemPedido);
  })
  setRecarregar(true)
  closeModal()
}
//console.log(vendas)


if(listaCli){
  let cont =0 ;
  listaCli.forEach(cliLista => {
      
      
    listaC[cont] =  { value: cliLista.id, label: cliLista.nome }
     cont ++
   });
  }
  console.log(vendas)
 console.log(todosPedidos)

 // *****************controla modal ******

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
        <span>Numero pedido</span>
    <input type="text" placeholder="Numero pedido"  onChange={(e) => setBuscaIdPedido(e.target.value)} />
        <span>Cliente</span>
        <input type="text" placeholder="Cliente" onChange={(e) => setBuscaNomePedido(e.target.value)}/>
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

                        <span>Total Pedido</span>
                        <input type="text" placeholder="Total Pedido" className="input-numerico" disabled value={totalPedido || ""}/>
                      </div>

                      <div className="row-lista-vendas">

                        {vendas && 
                           <div>
                           <h1>{vendas.cliente}</h1>
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
                                                 {vendas.map(produto => (<tr key={produto.produto}>
                                                   
                                                   <td> {produto.produto}</td>
                                                   <td> {produto.quantidade} </td>
                                                   <td> R$: {produto.valor} </td>
                                                   <td> R$: {produto.valor * produto.quantidade} </td>
                                                 
                                                 
                                                   <td>
                                                     <div className="icons">
                                                     <i onClick={() => {handleDelete(produto.idProduto)}}><FcCancel /></i>
                                                     
                                                     </div>
                                                     
                                                   </td>
                                                 
                                                 </tr>))}
                                   
                                               </tbody>
                                             
                                               
                                               </table>
                                         ): (
                                       <p>Não foi encontrado esse produto </p>
                                     )}
                       </div>
                        }
                        
                      
                      

                      </div>
                     
                </div>
                <button onClick={handleFinalizar}>Finalizar Venda</button>
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