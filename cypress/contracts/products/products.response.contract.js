import Joi from 'joi'

// 201 - Cadastro com sucesso
export const productCreatedResponse = Joi.object({
    message: Joi.string().valid('Cadastro realizado com sucesso').required(),
    _id: Joi.string().required()
})

// 400 - Produto com nome duplicado
export const productAlreadyExistsResponse = Joi.object({
    message: Joi.string().valid('Já existe produto com esse nome').required()
})

// 401 - Token ausente, inválido ou expirado
export const unauthorizedTokenResponse = Joi.object({
    message: Joi.string().valid(
        'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais'
    ).required()
})

// 200 - Produto Alterado com sucesso
export const successUpdated = Joi.object({
    message: Joi.string().valid('Registro alterado com sucesso').required()
})

// 201 - Cadastrar Produto caso ID invalido
export const registerProduct = Joi.object({
    message: Joi.string().valid('Cadastro realizado com sucesso').required(),
    _id: Joi.string().required()
})

export const tryUpdatedExistentName = Joi.object({
    message: Joi.string().valid('Já existe produto com esse nome').required(),
})