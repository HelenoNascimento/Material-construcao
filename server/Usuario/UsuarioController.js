const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const Sequelize = require("sequelize");
const Usuario = require("./Usuario");
const { response } = require("express");

//token
const jwt = require('jsonwebtoken');
const SECRET ='testetols'

const myPlaintextPassword = 's0/\/\P4$$w0rD';
// cadastrando usuario

const newUsuario = async  (req, res)=>{
    const {email, senha, nome} = req.body;
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    Usuario.findOne({where: {
        email: email,
    }}).then(user =>{
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(`${senha}`,salt);

            var correct  = bcrypt.compareSync("123",hash);
           
            var teste = (Buffer.byteLength(hash))
            console.log(teste)
            console.log(correct);

            Usuario.create({
                nome: nome,
                email: email,
                senha: hash
            }).then(()=>{
                res.status(200).json({ Usuario, message: "Usuario cadastrado com sucesso!" });
            }).catch((err)=>{
                console.log(err);

            })
        }else{
            res.status(200).json({ Usuario, message: "Usuario ja cadastrado!" });
        }
    })
}

//logando no sistema

const login = async (req, res) =>{
    const {email, senha} = req.body;
    
    Usuario.findOne({where: {email}}).then(user =>{
        if(user != undefined){// se existe usuario com esse email

          
            var correct  = bcrypt.compareSync(senha,user.senha);


            console.log(correct);
            console.log(senha);
            console.log(user.senha);
            if(correct){
              const token =  jwt.sign({userID: user.id},SECRET, {expiresIn: 300} )
                res.status(200)
                res.json({ auth: true, token});
               
            }else{
                res.status(401)
                res.json({ err: "credenciais inválidas" })
            }
           
      
         
        }else{
            res.status(400).json({ err: "O email enviado é inválido" })
        }
    })
   
    
}

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    console.log("aqio")
    jwt.verify(token, SECRET, (err, decoded) =>{
        if(err) return res.status(401).end();

        req.userId = decoded.userId;

        next();
    })
}

module.exports = {
    newUsuario,
    login,
    verifyJWT,
}



/*
 Usuario.findOne({where: {email}}).then(user =>{
        if(user != undefined){// se existe usuario com esse email

          
            var correct  = bcrypt.compareSync("123",user.senha);


            console.log(correct);
            console.log(senha);
            console.log(user.senha);
            if(correct){
                res.status(200).json({ Usuario, message: "Logado " +user.senha});
               
            }else{
                //res.status(200).json({ Usuario, message: "Senha incorreta " +senha });
                res.status(200).json({user });
            }
            var salt = bcrypt.genSaltSync(10);
      
         
        }else{
            res.status(200).json({ Usuario, message: "Não encontrado" });
        }
    })


     if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(`${senha}`,salt);

            var correct  = bcrypt.compareSync("123",hash);
           
            var teste = (Buffer.byteLength(hash))
            console.log(teste)
            console.log(correct);

            Usuario.create({
                nome: nome,
                email: email,
                senha: hash
            }).then(()=>{
                res.status(200).json({ Usuario, message: "Usuario cadastrado com sucesso!" });
            }).catch((err)=>{
                console.log(err);

            })
        }else{
            res.status(200).json({ Usuario, message: "Usuario ja cadastrado!" });
        }
    })


    if(email != undefined){
        var user = await Usuario.findOne({where: {email: email}});

        if(user != undefined){

            var correct = await bcrypt.compare(senha, user.senha);
            
            console.log(teste)
            
            if(correct){
                res.status(200)
                res.json({ token: "Token falso" })
            }else{
                res.status(401)
                res.json({ err: "credenciais inválidas" })
            }
        }

    }else{
        res.status(400)
        res.json({ err: "O email enviado é inválido" })
    }
*/