const mysql = require('mysql2');
const { QuerySyntaxError, DuplicateEntryError, AppError } = require('../utils/error-class');

let pool;

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    namedPlaceholders: true
}

const getPool = () => {
    if(!pool) {
        pool = mysql.createPool(config)
    }

    return pool.promise()
}

const executeQuery = async (query, params = {}) => {
    if(!pool) {
        pool = getPool()
    }

    try {
        const result = await pool.execute(query, params)
        return result

    } catch (error) {
        if (error.code === 'ER_PARSE_ERROR') {
            throw new QuerySyntaxError(
                error.code,
                error.message
            )
        }

        else if(error.code === 'ER_DUP_ENTRY') {
            throw new DuplicateEntryError(
                error.code,
                error.message
            )
        }

        else  {
            throw new AppError(
                500,
                'Database error',
                error.message
            )
        }

    }
}

module.exports = executeQuery