const {executeQuery} = require("../../../config/db-connection")
const { NotFoundError } = require("../../../utils/error-class")
const responseHandler = require("../../../utils/response-handler")

const getUserQuery = `
    SELECT 
        user_name,
        email,
        phone
    FROM user
    WHERE user_id = :userId`


const getUser = async (req, res) => {
    const {userId} = req.params

    const results = await executeQuery(getUserQuery, {userId})
    
    if(results.length === 0 || !results) {
        throw new NotFoundError(
            'NOT_FOUND',
            'User not found'
        )
    }

    return responseHandler(
        res,
        true,
        200,
        "User details",
        results
    )
}

module.exports = getUser