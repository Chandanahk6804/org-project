const bcrypt = require('bcrypt')
const { AppError } = require('./error-class')

async function hashPassword(password) {
    try{
        return bcrypt.hash(password, Number(process.env.SALT))
    }
    catch(error) {
        throw new AppError(
            false,
            'Server error',
            'Internal Server error'
        )
    }
}

module.exports = hashPassword