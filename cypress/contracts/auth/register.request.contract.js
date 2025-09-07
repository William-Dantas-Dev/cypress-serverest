import Joi from 'joi';

export const registerRequest = Joi.object({
    nome: Joi.string().trim().min(2).max(120).required(),
    email: Joi.string().trim().lowercase().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).max(128).required(),
    administrador: Joi.string().valid('true', 'false').required()
}).unknown(false);

export function validateRegisterRequest(payload) {
    const { error, value } = registerRequestSchema.validate(payload, {
        abortEarly: false
    });
    return { error, value };
}