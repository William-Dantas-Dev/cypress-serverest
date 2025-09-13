// cartPostSchema.js
const Joi = require('joi');

const produtoSchema = Joi.object({
  idProduto: Joi.string().required(),
  quantidade: Joi.number().integer().min(1).required(),
});

const cartPostSchema = Joi.object({
  produtos: Joi.array().items(produtoSchema).min(1).required(),
});

export { cartPostSchema };
