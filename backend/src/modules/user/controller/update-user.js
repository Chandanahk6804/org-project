const { executeQuery } = require("../../../config/db-connection")
const { BadRequestError, NotFoundError } = require("../../../utils/error-class")
const responseHandler = require("../../../utils/response-handler")

let  updateQuery = `
    UPDATE user
    SET `

const updateUser = async (req, res) => {
    const {userId} = req.params
    const {userName, email, phone} = req.body

    if(!userName && !email && !phone) {
        throw new BadRequestError(
            'BAD_REQUEST',
            "Provide Fields for updating"
        )
    }

    let params = {}

    if(userName) {
        updateQuery += `user_name = :userName `
        params["userName"] = userName
    }
    if(email) {
        updateQuery += `,email = :email `
        params["email"] = email
    }
    if(phone) {
        updateQuery += `,phone = :phone `
        params["phone"] = phone
    }

    updateQuery += `WHERE user_id = :userId AND is_active = 1`
    params["userId"] = userId

    console.log(params)
    console.log(updateQuery)
    const result = await executeQuery(updateQuery, params)

    if(result.affectedRows === 0) {
        throw new NotFoundError(
            'NOT_FOUND',
            'User not found'
        )
    }

    return responseHandler(
        res,
        true,
        200,
        'User updated successfully'
    )
}

module.exports = updateUser