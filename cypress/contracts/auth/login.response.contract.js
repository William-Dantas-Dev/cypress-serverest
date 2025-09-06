import Joi from 'joi'

const loginSuccessResponse = Joi.object({
    message: Joi.string().valid('Login realizado com sucesso').required(),
    authorization: Joi.string().required()
})

const loginErrorResponse = Joi.object({
    message: Joi.string()
        .valid('Email e/ou senha inválidos', 'email deve ser um email válido')
        .required()
}).unknown(false)

const validationEmailErrorResponse = Joi.object({
    email: Joi.string().required()
}).unknown(true)

const validationRequiredFieldErrorResponse = Joi.object({
    email: Joi.string(),
    password: Joi.string()
}).or('email', 'password').unknown(false)



export { loginSuccessResponse, loginErrorResponse, validationEmailErrorResponse, validationRequiredFieldErrorResponse}
