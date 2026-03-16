const { executeQuery } = require("../../../config/db-connection")
const { AppError } = require("../../../utils/error-class")
const responseHandler = require("../../../utils/response-handler")

const updateStatusQuery = `
    UPDATE task
    SET status = :status
    WHERE task_id = :taskId
    AND org_id = :orgId`

const updateTask = async (req, res) => {
    const {orgId, taskId} = req.params
    const {status} = req.body

    const result = await executeQuery(updateStatusQuery, {orgId, taskId, status})

    if(result.affectedRows === 0) {
        throw new AppError(
            500,
            'SERVER ERROR',
            'Task status cannot be updated'
        )
    }

    return responseHandler(
        res,
        true,
        200,
        'Task status updated successfully'
    )
}