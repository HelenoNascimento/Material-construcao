import React from 'react'

const FormCadastroProd = () => {
  return (
    <form >
        <div>
            <label>Nome:</label>
            <input type="text" placeholder="Nome" />   
        </div>
        <div>
            <label>Descricao:</label>
            <input type="text" placeholder="Descricao" />   
        </div>
        <div>
            <label>Quantidade:</label>
            <input type="text" placeholder="Quantidade" />   
        </div>
        <div>
            <label>Fornecedor:</label>
            <input type="text" placeholder="Fornecedor" />   
        </div>
        <div>
            <label>Valor :</label>
            <input type="text" placeholder="Valor" />   
        </div>

    </form>
  )
}

export default FormCadastroProd