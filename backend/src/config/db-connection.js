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
        const [results] = await pool.execute(query, params)  //returns an array [results, fields]
        return results

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


const executeTransaction = async (callback) => {

    if(!pool) {
        pool = getPool()
    }

    const con = await pool.getConnection()

    try {
        await con.beginTransaction()
        const results = await callback(con)
        con.commit()
        return results
    }
    catch(error) {
        await con.rollback()
        throw new AppError(
            false,
            "Database Error",
            error.message
        )
    }
    
}

module.exports = {
    executeQuery,
    executeTransaction
}