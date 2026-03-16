const { executeQuery } = require("../../../config/db-connection")
const { NotFoundError, AppError } = require("../../../utils/error-class")
const responseHandler = require("../../../utils/response-handler")

const getUserQuery = `
    SELECT user_id
    FROM user
    WHERE 
        user_name = :userName
        AND is_active=1`

const addUserQuery = `
    INSERT INTO user_role (user_id, role_id, org_id)
    VALUES
    (:userId, :roleId, :orgId)`

const getRoleIdQuery = `
    SELECT role_id
    FROM role
    WHERE role_name = :roleName`

const addUser = async (req, res) => {
    const {orgId} = req.params
    const {userName, roleName} = req.body

    if (!userName || !roleName) {
        throw new AppError(
            false,
            'BadRequest',
            "Provide all the fields"
        )
    }

    const [result] = await executeQuery(getUserQuery, {userName})
    
    if(!result) {
        throw new NotFoundError(
            'NOT_FOUND',
            'User not found'
        )
    }

    const [role] = await executeQuery(getRoleIdQuery, {roleName})

    if(!role) {
        throw new NotFoundError(
            'NOT_FOUND',
            'Role not found'
        )
    }

    const userId = result.user_id
    const roleId = role.role_id

    console.log({userId, roleId, orgId})

    const insertResult = await executeQuery(addUserQuery, {userId, roleId, orgId})

    if(insertResult.affectedRows === 0) {
        throw new AppError(
            500,
            'SERVER_ERROR',
            'Internal server error'
        )
    }

    return responseHandler(
        res,
        true,
        200,
        'User added to the org successfully'
    )
}

module.exports = addUser