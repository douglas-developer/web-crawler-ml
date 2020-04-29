class BaseController {
    constructor(errorHandler) {
        this.errorHandler = errorHandler;
    }

    conflict(message) {
        let errorMessage = message || 'Conflict';
        return this.errorResponse(409, errorMessage);
    }

    forbidden(message) {
        let errorMessage = message || 'Forbidden';
        return this.errorResponse(403, errorMessage);
    }

    notFound(message) {
        let errorMessage = message || 'Resource not found';
        return this.errorResponse(404, errorMessage);
    }

    unauthorized(message) {
        let errorMessage = message || 'Missing token or invalid token';
        return this.errorResponse(401, errorMessage);
    }

    unprocessableEntity(message) {
        let errorMessage = message || 'Invalid credentials or missing parameters';
        return this.errorResponse(422, errorMessage);
    }

    errorResponse(status, message) {
        let err = new Error();
        err.status = status || 422;
        err.message = message || 'Unprocessable entity';
        return err;
    }

    handleError(error) {
        error = this.sanitizeError(error);
        console.error(error);

        if (this.errorHandler) {
            return this.errorHandler.errorResponse(error);
        }

        let message = error.message;
        let status = error.status;
        return this.errorResponse(status, message);
    }

    sanitizeError(e) {
        if (e.response && e.config) {
            const response = e.response;
            const config = e.config;

            return {
                status: response.status,
                payload: JSON.stringify(response.data),
                url: config.url,
                request: config.data
            };
        }

        return e;
    }
}

module.exports = BaseController;
