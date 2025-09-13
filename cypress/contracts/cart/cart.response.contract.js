import Joi from 'joi'

const produtoSchema = Joi.object({
    idProduto: Joi.string().required(),
    quantidade: Joi.number().integer().min(1).required(),
    precoUnitario: Joi.number().min(0).required(),
});

const carrinhoSchema = Joi.object({
    produtos: Joi.array().items(produtoSchema).required(),
    precoTotal: Joi.number().min(0).required(),
    quantidadeTotal: Joi.number().integer().min(0).required(),
    idUsuario: Joi.string().required(),
    _id: Joi.string().required(),
});

const cartResponseSchema = Joi.object({
    quantidade: Joi.number().integer().min(0).required(),
    carrinhos: Joi.array().items(carrinhoSchema).required(),
});

const successCartRegister = Joi.object({
    message: Joi.string().valid('Cadastro realizado com sucesso').required(),
    _id: Joi.string().required()
})

const successCartDelete = Joi.object({
    message: Joi.string().valid('Registro excluído com sucesso. Estoque dos produtos reabastecido').required(),
});

const notFoundCartDelete = Joi.object({
    message: Joi.string().valid('Não foi encontrado carrinho para esse usuário').required(),
});

const cartDeleteResponse = Joi.alternatives().try(successCartDelete, notFoundCartDelete);

export { cartResponseSchema, successCartRegister, cartDeleteResponse }