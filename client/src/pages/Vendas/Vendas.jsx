
import React, {useState, useEffect} from 'react'
import ItensVenda from '../../componentes/ItensVenda';
import Cliente from '../Cliente/Cliente';
import "./Vendas.css"


const closeModal = ()=>{
  const modal = document.querySelector('#modal-vendas');
  modal.classList.add("hide-vendas")
}

const Vendas = () => {
const [teste, setTeste] = useState(false)
const [produto, setProduto] = useState("");
const [quantidade, setQuantidade] = useState("");
const [cliente, setCliente] = useState("");

const  [vendas,setVendas] = useState([]);
let qnt = 0;

const itensVenda = []

const testeVenda ={
  cliente,
  itens:[],
}



console.log(testeVenda)


const handleVendas = (e) =>{

 
  //e.preventDefault();
/*
  itensVenda.push({cliente: cliente, produto: produto, quantidade: quantidade}) 
  
  testeVenda.push ({
    cliente: cliente,
    itens:[({produto: produto, quantidade: quantidade})]
  })*/
  //console.log(testeVenda)
//console.log(itensVenda)
  setVendas([...vendas,{cliente: cliente, produto: produto, quantidade: quantidade}])
  qnt ++
//console.log(itensVenda)
//setVendas([itensVenda])
//console.log(vendas)
setTeste(true)


}
console.log(vendas)
//console.log(vendas)


 

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
                 
                <div className="busca-client"> 
                <h2>Dados Cliente</h2>
                      <input type="text" placeholder='Digite o codigo' onChange={(e) => setCliente(e.target.value)} /> 
                    
                </div>
             
                     
                     <div className='dados-client'>
                        <div className='input_vendas'> 
                              <label className='label-nome'>Nome:</label>
                            <input type="text"  placeholder="Nome" disabled/>       
                        </div>
                        <div className='input_vendas'> 
                              <label>Telefone:</label>
                            <input type="text"  placeholder="Telefone" disabled/>       
                        </div>
                        <div className='input_vendas'> 
                              <label>Endereco:</label>
                            <input type="text"  placeholder="Endereco" disabled/>       
                        </div>


                     </div>
                    
                      </div>
                      
                
                <div className="vendas-produto">
                      <div className='pesq-produto'>
                      <label>Produto</label>
                        <input type="text" placeholder='Codigo do produto' onChange={(e) => setProduto(e.target.value)}/>
                      </div>
                      <div className="row-produto">
                            <label> Nome</label>
                            <input type="text" placeholder="Nome" disabled/>
                            <label> Descricao</label>
                            <input type="text" placeholder="Descricao" disabled/>
                            <label> Valor</label>
                            <input type="text" placeholder="Valor"  className='input-numerico'disabled/>
                            <label> Qnt Estoque</label>
                            <input type="text" placeholder="Quantidade" className='input-numerico' disabled/>
                      </div>
                      <div className="row-adicionar">
                        <label>Quantidade</label>
                        <input type="text" placeholder="Quantidade" className="input-numerico" onChange={(e) => setQuantidade(e.target.value)}/>
                        <button onClick={handleVendas}>Adicionar</button>
                      </div>

                      <div className="row-lista-vendas">

                        {itensVenda && 
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