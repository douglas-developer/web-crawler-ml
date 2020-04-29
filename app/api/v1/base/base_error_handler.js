const errorMapping = require('../../../utils/error_mapping');

class BaseErrorHandler {
    errorResponse(data) {
        const defaultMessage = 'VALIDATION_ERROR';
        const status = data.status ? data.status : 422;
        const message = data.key ? data.key : defaultMessage;
        const error_code = errorMapping[message];

        return {
            status,
            errors: [ { error_code, message } ]
        };
    }
}

module.exports = BaseErrorHandler;
