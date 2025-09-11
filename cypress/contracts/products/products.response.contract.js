import Joi from 'joi'

// ✅ 201 - Cadastro com sucesso
export const productCreatedResponse = Joi.object({
    message: Joi.string().valid('Cadastro realizado com sucesso').required(),
    _id: Joi.string().required()
})

// ✅ 400 - Produto com nome duplicado
export const productAlreadyExistsResponse = Joi.object({
    message: Joi.string().valid('Já existe produto com esse nome').required()
})

// ✅ 401 - Token ausente, inválido ou expirado
export const unauthorizedTokenResponse = Joi.object({
    message: Joi.string().valid(
        'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais'
    ).required()
})

// ✅ 403 - Acesso restrito a administradores
export const adminOnlyRouteResponse = Joi.object({
    message: Joi.string().valid('Rota exclusiva para administradores').required()
})
