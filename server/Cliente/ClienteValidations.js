const { body, validationResult} = require("express-validator");

const clienteCreateValidation =() =>{
   
    return [
        body("nome")
            .not()
            .equals("")
            .withMessage("O nome é obrigatorio")
            .isString()
            .withMessage("o Nome é obrigatório")
            .isLength({ min: 3 })
            .withMessage("O nome precisa ter no mínimo 3 caracteres."),
        body("endereco")
            .isString()
            .withMessage("Endereco é obrigatório")
            .isLength({min:3})
            .withMessage("o endereco precisa ter no minimo 3 caracteres"),
      
        ]     
}

module.exports = {
    clienteCreateValidation,
}