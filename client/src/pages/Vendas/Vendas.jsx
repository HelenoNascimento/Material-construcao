
import React, {useState, useEffect} from 'react'
import ItensVenda from '../../componentes/ItensVenda';
import ClienteService from '../../Service/ClienteService';
import ProdutoService from '../../Service/ProdutoService';
import PedidoService from '../../Service/PedidoService';
import Cliente from '../Cliente/Cliente';
import "./Vendas.css"
import Select from 'react-select'


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
const [ descricao, setDescricao] = useState("")
const [ valor, setValor] = useState("")
const [quantidadePro ,setQuantidadePro] = useState("")

const [teste, setTeste] = useState(false)
const [produto, setProduto] = useState("");
const [quantidade, setQuantidade] = useState("");
const [cliente, setCliente] = useState("");

const  [vendas,setVendas] = useState([]);
const  [novoPedido, setNovoPedido] = useState(true);


let qnt = 0;

const listaC = [];
useEffect(() => {


  const loadAll = async () =>{
  const prod = await ProdutoService.getAllProdutos();
  const client= await ClienteService.getAllClientes();
 setListaClientes(client)
 setlistaCli(client)
 setListaProdutos(prod)

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
setNomePro(produtoID[0].nome)
setQuantidadePro(produtoID[0].quantidade)
setDescricao(produtoID[0].descricao)
setValor(produtoID[0].valor)

console.log(produtoID[0].nome);
  }

  loadAll2();
 
},[produto]) 

useEffect(() => {
  const loadcliente = async () =>{
 const clienteID = await ClienteService.getClientById(cliente);
  
  setNome(clienteID.nome)
  setEndereco(clienteID.endereco)
  setTelefone(clienteID.telefone)
  setIdCliente(clienteID.idCliente) 
  console.log(clienteID);
  }
  loadcliente();
},[cliente]) 


//console.log(listaClientes)
//console.log(lsitaProdutos)

const handleVendas = (e) =>{

  if(novoPedido){
    const pedido = {
      idClient: cliente,
      total: 0,
      data: "25/05/2015"
    }
  
    console.log(pedido)
    PedidoService.novoPedido(pedido)
  }
 
  setVendas([...vendas,{
    idClient: cliente, 
    nome: nome, 
    produto: nomePro, 
    valor: valor, 
    quantidade: quantidade
    
  }])
  qnt ++

setNovoPedido(false)
setTeste(true)


}
//console.log(vendas)


if(listaCli){
  let cont =0 ;
  listaCli.forEach(cliLista => {
      
      
    listaC[cont] =  { value: cliLista.id, label: cliLista.nome }
     cont ++
   });
  }
 

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
        
    </div>
  )
}

export default Vendas