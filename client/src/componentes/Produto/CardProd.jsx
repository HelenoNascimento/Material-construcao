import React from 'react'

import "./CardProd.css"

const CardProd = (props) => {
  return (
    <div className="card--container">
        <div className="card--topo">
        <h2 className="card--title">{props.nome}</h2>
        </div>
        <div className="card--meio">
        <p className="card--descricao">Descricao: {props.descricao}</p>
        <p className="card--quantidade">Quantidade{props.quantidade}</p>
        </div>
        <div className="card--baixo">
        <p className="card--fornecedor">Fornecedor: {props.fornecedor}</p>
        <p className="card--valor">Valor: {props.valor}</p>
        </div>
    
    </div>
  )
}

export default CardProd