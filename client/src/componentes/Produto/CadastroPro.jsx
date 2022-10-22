
import "./CadastroPro.css";
import React, {useState, useEffect} from 'react'
import { IMaskInput } from "react-imask";
import Axios from "axios";
import Message from "../Message";
import Select from 'react-select'
import FornecedorService from '../../Service/FornecedorService';
import ProdutoService from "../../Service/ProdutoService";

const CadastroPro = () => {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [fornecedores, setFornecedores] = useState("");
    const [valor, setValor] = useState("");
    const [valorCompra, setValorCompra] = useState("");
    const [minimoEstoque, setMinimoEstoque] = useState("");



    const [produtos, setProdutos] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [ idFornecedor, setIdFornecedor] = useState("");


    const options = [
        { value: 'Ferramenta', label: 'Ferramenta' },
        { value: 'Material', label: 'Material' },
        { value: 'Decoracao', label: 'Decoracao' },
        { value: 'Lazer', label: 'Lazer' },
        
        { value: 'Tinta', label: 'Tintal' }
      ]
      let teste = [
        
      ]
      

      useEffect(() => {
        const carregaFornecedor = async() =>{
              const resultado = await FornecedorService.getAllFornecedores();
              setFornecedores(resultado);
             //console.log(resultado)
             console.log(fornecedores)
        }
        carregaFornecedor();
    },[])
    if(fornecedores){
        let cont =0 ;
        fornecedores.forEach(fornecedor => {
            
            
           teste[cont] =  { value: fornecedor.id, label: fornecedor.nome }
           cont ++
         });
         console.log(teste)
         console.log(options)
    }
   
 
    const handleClickButton = async (e) =>{
        //e.preventDefault();

        const newProduto = {
            nome: nome,
            descricao: descricao,
            quantidade: quantidade,
            idFornecedor: idFornecedor,
            valor: valor,
            valor_compra: valorCompra,
            status: "Ativo",
            minimo_estoque: minimoEstoque,

        }

        //ProdutoService.cadastraProduto(newProduto)
       
        console.log(nome, descricao, quantidade)
       Axios.post("http://localhost:3001/produto/register",{
            nome: nome,
            descricao: descricao,
            quantidade: quantidade,
            idFornecedor: idFornecedor,
            valor: valor,
            valor_compra: valorCompra,
            status: "Ativo",
            minimo_estoque: minimoEstoque,
        }).then((response) =>{
            console.log(response);
            
          setNome("");
          setDescricao("");
          setQuantidade("");
          setFornecedores("");
          setQuantidade("");
          setValor("");
          setError(null)
        }).catch(function (error) {
            console.log(error)
            console.log(error.response.data.errors[0].msg)
            setMessage(error.response.data.errors[0].msg);
            setError(error)
            setTimeout(() => {
                setError(null)
              }, 2000);
          });

    }
console.log(idFornecedor)

  return (
        <div className="container-cadastro">
         <form onSubmit={handleClickButton} className="formulario">
        <div className='input_container' >
            <label>Nome:</label>
            <input type="text" placeholder="Nome" 
            onChange={(e) => setNome(e.target.value)} value={nome || ""}/>   
        </div>
        <div className='input_container'> 
            <label>Descricao:</label>
            <input type="text" placeholder="Descricao" 
            onChange={(e) => setDescricao(e.target.value)} value={descricao || ""} />   
        </div>
      
         
       
        <div className='input_container valor'> 
            <label>Quantidade:
                <input
                className="numerico"
                type="number" 
                placeholder="Quantidade"  
                onChange={(e) => setQuantidade(e.target.value)} 
                value={quantidade || ""}
                />  
            </label> 
             <label>Minimo estoque:
                <input
                className="numerico"
                type="number" 
                placeholder="Quantidade"  
                onChange={(e) => setMinimoEstoque(e.target.value)} 
                value={minimoEstoque || ""}
                />   
            </label>
           
        </div>
        
        <div className='input_container'>
            <label>Fornecedor:</label>
            <Select options={teste} placeholder="Fornecedores" className="select"  onChange={(e) => setIdFornecedor(e.value)}/> 
        </div>
        <div className='input_container valor'>
            <label>Valor de venda :
                <input type="number" placeholder="Valor"  className="numerico"
                onChange={(e) => setValor(e.target.value)} value={valor || ""}/> 
            </label>
            <label>Valor de Compra : 
                <input type="number" placeholder="Valor" className="numerico"
                onChange={(e) => setValorCompra(e.target.value)} value={valorCompra || ""}/>   
            </label>
        </div>
        <div className='input_container'>
          
         
                    
                   
     

        </div>
        <button className="register--button" >Cadastrar</button>

        {error && <Message msg={message} type= "error" /> }
       
        
    </form>
    </div>
  )
}

export default CadastroPro