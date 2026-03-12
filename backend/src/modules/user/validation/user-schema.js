const joi = require('joi')

const baseSchema = joi.object({
    userName: joi.string().trim().empty(/\s+/).min(3).max(50),
    email: joi.string().email(),
    phone: joi.number(),
    password: joi.string().trim().empty(/\s+/).min(3).max(8)
})

const signupSchema = baseSchema.fork(
    ['userName', 'email', 'phone', 'password'], 
    (field) => field.required()
)

module.exports = signupSchema