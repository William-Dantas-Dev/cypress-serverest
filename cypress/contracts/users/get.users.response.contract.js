import Joi from 'joi'

const userSchema = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    administrador: Joi.string().valid('true', 'false').required(),
    _id: Joi.string().required(),
})

const getUsersResponseContract = Joi.object({
    quantidade: Joi.number().integer().min(0).required(),
    usuarios: Joi.array().items(userSchema).required(),
})

export default getUsersResponseContract
