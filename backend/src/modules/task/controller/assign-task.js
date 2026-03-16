const { executeQuery } = require("../../../config/db-connection")
const { NotFoundError } = require("../../../utils/error-class")
const responseHandler = require("../../../utils/response-handler")

const assignTaskQuery = `
    UPDATE task
    SET 
        reporter = :reporter,
        assignee = :assignee
    WHERE 
        task_id = :taskId
    AND 
        org_id = :orgId
`
const getIdQuery = `
    SELECT user_id
    FROM user
    WHERE user_name = :assigneeName`

const assignTask = async (req, res) => {
    const {assigneeName} = req.body
    const {orgId, taskId} = req.params

    const [assigneeResult] = await executeQuery(getIdQuery, {assigneeName})
    const assignee = assigneeResult.user_id

    const reporter = res.locals.user.userId

    console.log({
            reporter,
            assignee,
            taskId,
            orgId
        })

    const result = await executeQuery(
        assignTaskQuery, 
        {
            reporter,
            assignee,
            taskId,
            orgId
        })

    if(result.affectedRows === 0) {
        throw new NotFoundError(
            'NOT_FOUND',
            'Task not found'
        )
    }

    return responseHandler(
        res,
        true,
        200,
        'Task assigned successfully'
    )
}

module.exports = assignTask