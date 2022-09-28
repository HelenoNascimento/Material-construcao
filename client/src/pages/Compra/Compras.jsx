import React from 'react'
import "./Compras.css"

import {useState,useEffect} from 'react'
import FornecedorService from '../../Service/FornecedorService';
import ProdutoService from '../../Service/ProdutoService';
import Select from 'react-select'
import CompraService from '../../Service/CompraService';


const Compras = () => {

  //ultima Compra
  const[ultimaCompra, setUltimaCompra] = useState("");
  const [controlaUltimo, setControlaUltimo] = useState(false);

  //dados do produto
  const [listaProdutos, setListaProdutos] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [produto, setProduto] = useState("");

  // dados fornecedor
  const [listaFornecedor, setListaFornecedor] = useState("");
  const [FornecedorSelecionado, setFornecedorSelecionado] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [nomeFornecedor, setNomeFornecedor] = useState("");
  const [codigoFornecedor, setCodigoFornecedor] = useState("");
  const [telefoneFornecedor, setTelefoneFornecedor] = useState("");

  //carrinho
  const [quantidade, setQuantidade] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [carrinho, setCarrinho] = useState([]);
  const [atualizaCarrinho, setAtualizaCarrinho] = useState(false)
  const [totalCompra, setTotalCompra] = useState("");
 

  const today = new Date();
//array dos selects
  const liProdutos = [];
  const liFornecedor = [];

  //carrinho
  //let carrinho = [];
  

  const hideOrShowModal = (display)=>{
    const modal = document.querySelector('#modal-compras');

    if(display){
      modal.classList.remove('hide-compras');
    }else{
      modal.classList.add("hide-compras");
    }
  }
  const closeModal =() =>{
    const modal = document.querySelector('#modal-compras');
    modal.classList.add("hide-compras")
  }
  const abrirModal = () =>{
      
    hideOrShowModal(true);
  }
  
//carrega dados
const ultimoPedido = async() =>{
  let ultimaC = await CompraService.getUltimaCompra();
  setUltimaCompra(ultimaC[0])
}


useEffect(() => {

  const carregaDados= async() =>{
     let produtos = await ProdutoService.getAllProdutos();
     let fornecedores = await FornecedorService.getAllFornecedores();
     setListaProdutos(produtos);
     setListaFornecedor(fornecedores) 
    
    
  }
  ultimoPedido();
  carregaDados();
  console.log(ultimaCompra.id)
 
 
},[])

 



// { value: cliLista.id, label: cliLista.nome }
if(listaProdutos){
  listaProdutos.forEach(protudo =>{
    liProdutos.push({ value: protudo.id, label: protudo.nome })
  }) 
}
if(listaFornecedor){
  listaFornecedor.forEach(forn =>{
    liFornecedor.push({ value: forn.id, label: forn.nome })
  })
}


//preenche campos
useEffect(() =>{
  
  const preencheCampos  = async ()=>{
    let produto  = await ProdutoService.getProdutoById(produtoSelecionado)
   let forn = await FornecedorService.getFornecedorById(FornecedorSelecionado)
    setProduto(produto[0])
   
   if(forn){
    setCodigoFornecedor(forn.id)
    setNomeFornecedor(forn.nome)
    setTelefoneFornecedor(forn.telefone) 
   }
  

  }
  
  preencheCampos();
  
 
},[produtoSelecionado,FornecedorSelecionado,carrinho])

//carrinho

useEffect(()=>{

 setValorTotal(quantidade* produto.valor)

},[quantidade,carrinho])

//**********************Atualiza total do pedido **************** */
const atualizaTotal = () =>{
  let total = 0
  carrinho.forEach(item =>{
    total += item.valor_total
   
  })
  setTotalCompra(total)
}


//ADICONANDO ITEM NO CARRINHO

const AdicionaCarrinho = (e) =>{
  setAtualizaCarrinho(false)
  let controleCarrinho = 0;
  //e.preventDefault();
  controleCarrinho = 0;
carrinho.map(itemCarrinho =>{
  setAtualizaCarrinho(false)
  
    if(itemCarrinho.idProduto === produtoSelecionado){
    
      itemCarrinho.quantidade = parseInt(itemCarrinho.quantidade) + parseInt(quantidade)
      itemCarrinho.valor_total= parseInt(itemCarrinho.quantidade) * parseInt(itemCarrinho.valor_Item)
      console.log("ja tem ")
      
      controleCarrinho = 1
      setAtualizaCarrinho(false)
     //setQuantidade("");
     atualizaTotal();
      return
    }
})
ultimoPedido();

if(controleCarrinho === 0){
 
  let item = {
    idProduto: produto.id,
    nomeProduto: produto.nome,
    quantidade: quantidade,
    valor_Item: produto.valor,
    valor_total: produto.valor * quantidade,
    Compra: ultimaCompra.id+1,
  }
  carrinho.push(item)
  controleCarrinho = 0;
  setAtualizaCarrinho(true)
  atualizaTotal();

  //setControlaUltimo(true);
}



//setCarrinho(...carrinho + item)

//console.log(carrinho)
//console.log(atualizaCarrinho)
}
useEffect(()=>{
  console.log("teste")
},[atualizaCarrinho])

const finalizarPedido =  (e) =>{
e.preventDefault();
ultimoPedido();
   
    const compra = {
        total: totalCompra,
        data: today.toLocaleDateString(),
        data_entrega: today.toLocaleDateString(),
        status: "Pendente",
        idFornecedor: codigoFornecedor
    } 
   CompraService.novaCompra(compra); 
    console.log(compra)
    console.log(carrinho)
    console.log(ultimaCompra.id)

   carrinho.forEach(item =>{
      const novoItemCompra = {
        quantidade: item.quantidade,
        valor_item: item.valor_Item,
        idProduto: item.idProduto,
        idCompra: ultimaCompra.id+1
      }
    CompraService.itemCompra(novoItemCompra);
   })
}

  return (
    <div className='container--compras'>
      <div className='row--buttons'>
          <button onClick={abrirModal}>Fazer Pedido</button>
      </div>
      <div className='lista--compras'>

      </div>
      <div  id="modal-compras" className="hide-compras">
          <div className='fade-compras' onClick={closeModal}></div>
          <div className='modal-compras'>
              <div className='linha-pesquisa'>
                  <div className="pesquisa--produto">
                      <span>Produto</span>
                      <Select   options={liProdutos} placeholder="Produtos" className="pesquisa"  
                           onChange={(e) => setProdutoSelecionado(e.value)}
                          />
                  </div>
                  <div className="pesquisa--fornecedor">
                        <span>Fornecedor</span>
                        <span>Produto</span>
                      <Select   options={liFornecedor} placeholder="Fornecedor" className="pesquisa"  
                          onChange={(e) => setFornecedorSelecionado(e.value)}
                          />
                  </div>


              </div>

            <div className='linha'>
                <div className="linha--produto">
                  <label className='label-codigo'>Codigo:</label>
                   <input type="text"  placeholder="Codigo" disabled value={produto.id || ""}/> 

                  <label className='label-nome'>Nome:</label>
                   <input type="text"  placeholder="Nome" disabled value={produto.nome || ""}/> 

                   <label className='label-est'>Estoque:</label>
                   <input type="text"  placeholder="Estoque" disabled value={produto.quantidade || ""}/> 

                </div>
                 <div className="linha--fornecedor">
                 <label className='label-codigo'>Codigo:</label>
                   <input type="text"  placeholder="Codigo" disabled value={codigoFornecedor || ""}/> 

                  <label className='label-nome'>Nome:</label>
                   <input type="text"  placeholder="Nome" disabled value={nomeFornecedor || ""}/> 

                   <label className='label-est'>Telefone:</label>
                   <input type="text"  placeholder="Telefone" disabled value={telefoneFornecedor || ""}/> 
                </div>
            </div>
              <div className="adicionar">
                    <label className='label-nome'>Quantidade:</label>
                    <input type="text" className='input-numero' placeholder="Quantidade"  onChange={(e) => setQuantidade(e.target.value)}/> 
                      <button onClick={AdicionaCarrinho}>Adicionar</button>
                    <label className='label-est'>Valor total:</label>
                    <input type="text"  placeholder="Valor Total" disabled value={totalCompra || ""}/> 

              </div>
              <div className="row-carrinho">
              
                  {carrinho && <div>
                    {carrinho ? (
                      <table>
                        <thead>
                          <tr>
                            <th>Produto</th>
                            <th>quantidade</th>
                            <th>Valor Unitario</th>
                            <th>Total</th>
                            <th>Remover</th>
                          </tr>
                        </thead>
                        <tbody>
                        {carrinho.map(item => (<tr key={item.idProduto}> 
                        <td>{item.nomeProduto}</td>
                        <td>{item.quantidade}</td>
                        <td>{item.valor_Item}</td>
                        <td>{item.valor_total}</td>
                        <td></td>
                        
                        
                        </tr>))}
                        </tbody>
                      </table>
                      
                      ) : (<p>Sem itens</p>) }
                    
                 </div>}
                           <button onClick={finalizarPedido}>Finalizar Venda</button>
              </div>
              
          </div>
          
          <div>
         
          </div>
      </div>

    </div>
  )
}

export default Compras