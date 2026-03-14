const joi = require('joi')

const baseSchema = joi.object({
    userName: joi.string().trim().min(3).max(50),
    email: joi.string().email(),
    phone: joi.number(),
    password: joi.string().trim().min(3).max(8)
})

const signupSchema = baseSchema.fork(
    ['userName', 'email', 'phone', 'password'], 
    (field) => field.required()
)

const updateSchema = baseSchema.fork(
    ['userName', 'email', 'phone'],
    (field) => field.optional()
)

const loginSchema = baseSchema.fork(
    ['email', 'password'],
    (field) => field.required()
)

module.exports = {signupSchema, updateSchema, loginSchema}