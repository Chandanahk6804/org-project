const { BadRequestError } = require("../utils/error-class")
const { verifyToken } = require("../utils/jwt-helper")

const authenticate = async (req, res, next) => {
    const header = req.headers['authorization']
    
    if(!header) {
        throw new BadRequestError(
            'BAD_REQUEST',
            'Authorization token not provided'
        )
    }

    const token = header.split(' ')[1]

    const payload = verifyToken(token)
    console.log(payload)

    res.locals.user = payload
    next()
}

module.exports = authenticate