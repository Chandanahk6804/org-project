const executeQuery = require("../../../config/db-connection")

const getUsersQuery = `
    SELECT 
        user_name,
        user_email,
        phone
    FROM user`


const getAllUsers = async (req, res) => {
    const result = await executeQuery(getUsersQuery)
}

module.exports = getAllUsers