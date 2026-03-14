const { executeQuery } = require("../../../config/db-connection")
const { verifyPassword } = require("../../../utils/bcrypt-helper")
const { BadRequestError, NotFoundError, AppError } = require("../../../utils/error-class")
const { generateToken } = require("../../../utils/jwt-helper")
const responseHandler = require("../../../utils/response-handler")

const getUserQuery = `
    SELECT 
        u.user_id,
        uc.password_hash
    FROM user u
    JOIN user_cred uc
    ON u.user_id = uc.user_id
    WHERE email = :email
    AND is_active = 1`

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        throw new BadRequestError(
            'BAD_REQUEST',
            'Email and Password must not be empty'
        )
    }

    const [result] = await executeQuery(getUserQuery, {email})

    if(!result) {
        throw new NotFoundError(
            'NOT_FOUND',
            "User not found"
        )
    }

    const isMatch = await verifyPassword(password, result.password_hash)

    if(!isMatch) {
        throw new BadRequestError(
            'BAD_REQUEST',
            'Invalid credentials'
        )
    }

    const payload = {
        userId: result.user_id,
        email: email
    }

    const token = generateToken(payload)

    if(!token) {
        throw new AppError(
            'ServerError',
            'Internal Server Error'
        )
    }

    return responseHandler (
        res,
        true,
        200,
        'Login successful',
        token
    )
}
module.exports = login