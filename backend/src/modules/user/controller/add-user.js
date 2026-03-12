const { executeTransaction } = require("../../../config/db-connection")
const hashPassword = require("../../../utils/bcrypt-helper")
const { AppError } = require("../../../utils/error-class")
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


const addUser = async (req, res) => {
    const {userName, email, phone, password} = req.body

    if (!userName || !email || !phone || !password) {
        throw new AppError(
            false,
            'BadRequest',
            "Provide all the fields"
        )
    }

    const params = {
        userName: userName,
        email: email,
        phone: phone
    }

    const passwordHash = await hashPassword(password)

    const results = await executeTransaction(async (con) => {
        try {
            const [result] = await con.query(addUserQuery, params)

            const userId = result.insertId

            await con.query(addCreatedByQuery, {userId, email})

            await con.query(addUserCredQuery, {userId, passwordHash})

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
        'User created/ added successfully'
    )
}

module.exports = addUser