const express = require('express');
const app = express();
const connection = require("./Database/database")



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

    // config JSON form data response
app.use(express.json());
app.use(express.urlencoded({extended: false}));
    // routes
const routerProdu = require("./Produto/ProdutoRoute.js");

app.use(routerProdu);
 

app.listen(3001, () =>{

    console.log('servidor rodando na porta 3001');
});

