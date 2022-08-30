const { body, validationResult} = require("express-validator");



const produtoCreateValidation =() =>{
   
    return [
        body("nome")
            .not()
            .equals("")
            .withMessage("O nome é obrigatorio")
            .isString()
            .withMessage("o Nome é obrigatório")
            .isLength({ min: 3 })
            .withMessage("O nome precisa ter no mínimo 3 caracteres."),
        body("descricao")
            .isString()
            .withMessage("Mensage é obrigatório")
            .isLength({min:3})
            .withMessage("A descricao precisa ter no minimo 3 caracteres"),
        body("quantidade")
            .isFloat()
            .withMessage("Quantidade precisa ser um numero")
            .not()
            .equals("")
            .withMessage("A quantidade é obrigatoria"),
        body("valor")
            .isFloat()
            .withMessage("Valor precisa ser um numero")
            .not()
            .equals("")
            .withMessage("O Valor é obrigatorio")
        ]     
}

module.exports = {
    produtoCreateValidation,
}