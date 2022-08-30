const express = require('express');
const app = express();
const connection = require("./Database/database")
const cors =require("cors");

    // config JSON form data response
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));


     // routes
    const routerProdu = require("./Produto/ProdutoRoute.js");
    const routerForne = require("./Fornecedor/FornecedorRoute");
    
    app.use(routerProdu);
    app.use(routerForne);

    app.get("/",(req, res)=>{
        res.send("ola")
    })


//database
connection
    .authenticate()
    .then(() =>{
        console.log("Conexão feita com sucesso!")
    }).catch((error) =>{
        console.log(error);
    })


 

app.listen(3001, () =>{

    console.log('servidor rodando na porta 3001');
});

