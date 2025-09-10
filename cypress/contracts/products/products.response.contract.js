import Joi from 'joi'

const productSchema = Joi.object({
    nome: Joi.string().required(),
    preco: Joi.number().required(),
    descricao: Joi.string().required(),
    quantidade: Joi.number().required(),
    _id: Joi.string().required(),
})

const productsResponseContract = Joi.object({
    quantidade: Joi.number().integer().min(0).required(),
    produtos: Joi.array().items(productSchema).required(),
})

export default productsResponseContract
