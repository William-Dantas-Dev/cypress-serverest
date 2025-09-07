import Joi from 'joi';

export const registerSuccess = Joi.object({
    message: Joi.string().required(),
    _id: Joi.string().min(1).required()
}).unknown(false);

export const registerErrorValidation = Joi.object({
    nome: Joi.string(),
    email: Joi.string(),
    password: Joi.string()
}).or('email', 'password', 'nome').unknown(false);

export const registerErrorConflict = Joi.object({
    message: Joi.string().required()
}).unknown(false);
