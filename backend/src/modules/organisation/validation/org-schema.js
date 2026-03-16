const joi = require('joi')

const baseSchema = joi.object({
    orgName: joi.string().trim().min(3).max(50).required(),
    ownerName: joi.string().trim().min(3).max(50).required()
})

module.exports = baseSchema