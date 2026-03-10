class AppError extends Error{
    constructor(status, name, message) {
        super(message)
        this.status = status
        this.name = name
        this.message = message
        Error.captureStackTrace(this, this.constructor)
    }
}

class NotFoundError extends AppError{
    constructor(name = 'NOT_FOUND', message = 'Resource not found') {
        super(404, name, message)
    }
}

class BadRequestError extends AppError {
    constructor(name = 'BAD_REQUEST', message = 'Invalid request data' ) {
        super(400, name, message)
    }
}

class ForbiddenError extends AppError {
    constructor(name = 'FORBIDDEN_ACCESS', message = 'Access denied') {
        super(403, name, message)
    }
}

class DuplicateEntryError extends AppError {
    constructor(name = 'CONFLICT_ERROR', message = 'Resource already exists') {
        super(409, name, message)
    }
}

class QuerySyntaxError extends AppError {
    constructor(name = 'SQL_SYNTAX_ERROR', message) {
        super(500, name, message)
    }
}

module.exports = {
    AppError,
    NotFoundError,
    BadRequestError,
    ForbiddenError,
    DuplicateEntryError,
    QuerySyntaxError
}