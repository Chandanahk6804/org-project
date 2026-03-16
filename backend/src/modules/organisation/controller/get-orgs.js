const { executeQuery } = require("../../../config/db-connection")
const { NotFoundError } = require("../../../utils/error-class")
const responseHandler = require("../../../utils/response-handler")

const getOrgs = async (req, res) => {
    let getOrgsQuery = `
    SELECT 
        o.org_name,
        r.role_name
        FROM organisation o
        JOIN user_role ur
        ON o.org_id = ur.org_id
        JOIN role r
        ON r.role_id=ur.role_id
        WHERE `
        
    const {roleName, status, sortBy} = req.query

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const offset = (page - 1) * limit

    const userId = res.locals.user.userId
 
    let params = {
            userId
        }

    if(roleName) {
        getOrgsQuery += `r.role_name = :roleName AND `
        params['roleName'] = roleName
    }

    if(status) {
        getOrgsQuery += 'o.is_active = :status'
        params['status'] = status
    }

    getOrgsQuery += `o.is_active=1 AND ur.user_id = :userId`

    if(sortBy) {
        getOrgsQuery += ` ORDER BY ${sortBy} DESC`
    }

    getOrgsQuery += ` LIMIT ${limit} OFFSET ${offset}`

    console.log(getOrgsQuery)
    const result = await executeQuery(getOrgsQuery, params)

    if(result.length === 0) {
        throw new NotFoundError(
            'NOT_FOUND',
            'Orgs not found'
        )
    }

    return responseHandler(
        res,
        true,
        200,
        'Orgs list',
        result
    )
}

module.exports = getOrgs