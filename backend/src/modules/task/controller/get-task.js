const { executeQuery } = require("../../../config/db-connection")
const responseHandler = require("../../../utils/response-handler")

const getTasksQuery = `
    SELECT 
        task_name,
        task_status
    FROM task
    WHERE
    assignee = :assignee`

const getTasks = async (req, res) => {
    const assignee = res.locals.user.userId
    const result = await executeQuery(getTasksQuery, {assignee})
    return responseHandler(
        res,
        true,
        200,
        'List of tasks',
        result
    )
}

module.exports = getTasks