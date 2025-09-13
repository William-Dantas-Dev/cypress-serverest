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

export { cartResponseSchema }