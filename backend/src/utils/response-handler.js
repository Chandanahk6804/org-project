const responseHandler = (
    res,
    success = true,
    statusCode = 200, 
    message = "", 
    data = null) => {
        return res.status(statusCode).json({
            success: true,
            statusCode,
            message,
            data
        })
    }

    module.exports = responseHandler