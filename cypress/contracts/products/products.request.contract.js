import Joi from 'joi'

const productSchema = Joi.object({
    nome: Joi.string().required(),
    preco: Joi.number().integer().required(),
    descricao: Joi.string().required(),
    quantidade: Joi.number().required(),
    _id: Joi.string().required(),
})

const productSchemaRegister = Joi.object({
    nome: Joi.string().required(),
    preco: Joi.number().integer().required(),
    descricao: Joi.string().required(),
    quantidade: Joi.number().required(),
    _id: Joi.string(),
})

const productSchemaUpdate = Joi.object({
  nome: Joi.string(),
  preco: Joi.number().integer(),
  descricao: Joi.string(),
  quantidade: Joi.number().integer()
}).min(1)

const productsResponseContract = Joi.object({
    quantidade: Joi.number().integer().min(0).required(),
    produtos: Joi.array().items(productSchema).required(),
})

export { productSchema, productsResponseContract, productSchemaRegister, productSchemaUpdate }