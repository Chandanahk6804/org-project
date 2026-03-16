const { executeQuery } = require("../../../config/db-connection")
const { BadRequestError, AppError } = require("../../../utils/error-class")
const responseHandler = require("../../../utils/response-handler")

const createOrgQuery = `
    INSERT INTO organisation(org_name, owner_name, created_by)
    VALUES
    (:orgName, :ownerName, :createdBy)`

const createOrg = async (req, res) => {
    const {orgName, ownerName} = req.body

    if(!orgName || !ownerName) {
        throw new BadRequestError(
            'BAD_REQUEST',
            'Incomplete req body'
        )
    }

    const createdBy = res.locals.user.userId
    const params = {
        orgName,
        ownerName,
        createdBy
    }
    const result = await executeQuery(createOrgQuery, params)
    
    if(result.affectedRows === 0) {
        throw new AppError(
            500,
            'SERVER_ERROR',
            'Failed to create org'
        )
    }

    return responseHandler(
        res,
        true,
        201,
        'Org created successfully',
        {orgId: result.insertId}
    )
}

module.exports = createOrg