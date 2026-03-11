const executeQuery = require("../../../config/db-connection")
const { AppError } = require("../../../utils/error-class")
const responseHandler = require("../../../utils/response-handler")

const getUsersQuery = `
    SELECT 
        user_name,
        email,
        phone
    FROM user`


const getAllUsers = async (req, res) => {
    const results = await executeQuery(getUsersQuery)
    
    if(results.length === 0 || !results) {
        throw new AppError(
            false,
            'UserNotFound',
            'Users not found'
        )
    }

    return responseHandler(
        res,
        true,
        200,
        "List of users",
        results
    )
}

module.exports = getAllUsers