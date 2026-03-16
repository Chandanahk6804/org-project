const { BadRequestError } = require("../../../utils/error-class")

const validate = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body)
    if(error) {
        throw new BadRequestError(
            'BAD_REQUEST',
            error.details[0].message 
        )
    }
    next()
}

module.exports = validate