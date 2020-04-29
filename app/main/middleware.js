const ev = require('express-validation');
const _ = require('lodash');
const ValidationsErrorHandler = require('./validations_error_handler');
const validationsErrorHandler = new ValidationsErrorHandler();

function logError(err, req, res, next) {
    if (err) {
        console.error(err);
        return next(err);
    } else {
        return next();
    }
}

function handleError(err, req, res, next) {
    if (err) {
        if (err instanceof ev.ValidationError) {
            err = validationsErrorHandler.errorResponse(err);
        } else if (err instanceof Error) {
            err = _.pick(err, ['message', 'status']);
        }

        let status = err.status || 422;
        delete err.status;
        res.status(status).json(err);
    }else{
        next();
    }
}

function throw404(req, res, next) {
    var err = new Error();
    err.status = 404;
    err.message = "API_ENDPOINT_NOT_FOUND";
    next(err);
}

module.exports = exports = { logError, handleError, throw404};
