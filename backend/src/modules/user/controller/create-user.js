const { executeTransaction } = require("../../../config/db-connection")

const { AppError } = require("../../../utils/error-class")

const {hashPassword} = require("../../../utils/bcrypt-helper")
const responseHandler = require("../../../utils/response-handler")

const addUserQuery = `
    INSERT INTO user (user_name, email, phone)
    VALUES
    (:userName, :email, :phone)`

const addCreatedByQuery = `
    UPDATE user
    SET created_by = :userId
    WHERE email = :email`

const addUserCredQuery = `
    INSERT INTO user_cred(user_id, password_hash)
    VALUES
    (:userId, :passwordHash)`

    const addUserRoleQuery = `
        INSERT INTO user_role(user_id, role_id, created_by)
        VALUES (:userId, "R001", :userId)`


const createUser = async (req, res) => {
    const {userName, email, phone, password} = req.body

    if (!userName || !email || !phone || !password) {
        throw new AppError(
            false,
            'BadRequest',
            "Provide all the fields"
        )
    }

    const passwordHash = await hashPassword(password)
    const params = {
        userName: userName,
        email: email,
        phone: phone
    }

    const results = await executeTransaction(async (con) => {
        try {
            const [result] = await con.query(addUserQuery, params)

            const userId = result.insertId

            await con.query(addCreatedByQuery, {userId, email})

            await con.query(addUserCredQuery, {userId, passwordHash})

            await con.query(addUserRoleQuery, {userId})

            return result
        }
        catch(error) {
            throw new AppError(
                false,
                'Database error',
                error.message
            )
        }
    })

    if(!results || results.length === 0) {
        throw new AppError(
            false,
            'Database Error',
            'Internal Server Error'
        )
    }

    return responseHandler(
        res,
        true,
        200,
        'User created successfully'
    )
}

module.exports = createUser