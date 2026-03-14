const { executeQuery } = require("../../../config/db-connection")
const { NotFoundError } = require("../../../utils/error-class")
const responseHandler = require("../../../utils/response-handler")

const deleteQuery = `
    UPDATE user
    SET is_active = 0
    WHERE user_id = :userId`

const deleteUser = async (req, res) => {
    const {userId} = req.params

    const result = await executeQuery(deleteQuery, {userId})

    console.log(result.affectedRows)

    if(result.affectedRows === 0) {
        throw new NotFoundError(
            "NOT_FOUND",
            "User not found"
        )
    }

    return responseHandler(
        res,
        true,
        200,
        'User deleted successfully'
    )
}

module.exports = deleteUser