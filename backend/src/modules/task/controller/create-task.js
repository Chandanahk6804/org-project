const {executeQuery} = require('../../../config/db-connection')
const { AppError } = require('../../../utils/error-class')
const responseHandler = require('../../../utils/response-handler')

const createTaskQuery = `
    INSERT INTO task (task_name, org_id, is_active, task_status, created_by)
    VALUES
    (:taskName, :orgId, 1, "PENDING", :createdBy)`

const createTask = async (req, res) => {
    const {taskName} = req.body
    const {orgId} = req.params
    const createdBy = res.locals.user.userId

    const params = {
        taskName,
        orgId,
        createdBy
    }

    const result = await executeQuery(createTaskQuery, params)

    if(result.affectedRows === 0) {
        throw new AppError(
            500,
            'SERVER_ERROR',
            'Internal server error'
        )
    }

    return responseHandler(
        res,
        true,
        201,
        'Task created successfully'
    )
}

module.exports = createTask