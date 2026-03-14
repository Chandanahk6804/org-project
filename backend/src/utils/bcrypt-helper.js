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
            error.message || 'Internal Server error'
        )
    }
}

async function verifyPassword(password, hashedPassword) {
    try {
        return bcrypt.compare(password, hashedPassword)
    }
    catch(error) {
        throw new AppError(
            false,
            'Server error',
            error.message || 'Internal Server error'
        )
    }
}

module.exports = {hashPassword, verifyPassword}