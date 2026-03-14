const { executeQuery } = require("../config/db-connection")
const { ForbiddenError } = require("../utils/error-class")

const getRoleQuery = `
    SELECT role_id
    FROM user_role
    WHERE user_id = :userId`

const authorize = async (req, res, next) => {
    const userDetails = res.locals.user
    const userId = userDetails.userId
    const [result] = await executeQuery(getRoleQuery, {userId})
    
    if(!result) {
        throw new ForbiddenError(
            'FORBIDDEN',
            'Access denied'
        )
    }

    if(!["R002","R003"].includes(result.role_id)) {
        throw new ForbiddenError(
            'FORBIDDEN',
            'Access denied'
        )
    }

    next()
}

module.exports = authorize