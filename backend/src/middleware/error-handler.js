const responseHandler = require("../utils/response-handler")

const errorHandler = (err, req, res, next) => {
    console.log(err.stack)
    return responseHandler(
        res,
        success = false,
        err.statusCode || 500,
        err.message || "Internal server error",
        null
    )
}

module.exports = errorHandler