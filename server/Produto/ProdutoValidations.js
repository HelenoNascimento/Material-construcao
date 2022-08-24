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
            .not()
            .equals("")
            .withMessage("A quantidade é obrigatoria"),
        body("fornecedor")
            .not()
            .equals("")
            .withMessage("O fornecedor é obrigatoria")
            .isLength({min:3})
            .withMessage("o Fornecedor precisa ter no minimo 3 caracteres"),
        body("valor")
            .not()
            .equals("")
            .withMessage("A quantidade é obrigatoria")
        ]     
}

module.exports = {
    produtoCreateValidation,
}