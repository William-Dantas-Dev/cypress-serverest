import Joi from 'joi'

const loginRequestContract = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required()
})

export default loginRequestContract
