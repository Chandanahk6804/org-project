const joi = require('joi')

const baseSchema = joi.object({
    taskName: joi.string().trim().required()
})

module.exports = baseSchema