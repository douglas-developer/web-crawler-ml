const BaseErrorHandler = require('../api/v1/base/base_error_handler');
const _ = require('lodash');

class ValidationsErrorHandler extends BaseErrorHandler {
    errorResponse(data) {
        if (data.errors) {
            const error_code = 13;
            const status = data.status;
            const messages = [];
            data.errors.forEach(one => {
                one.messages.forEach(message => messages.push(message));
            });

            const errors = messages.map(one => {
                let param = _.first(one.match(/".*?"/g)).replace(/"/g, '');
                let message = one.replace(/"/g, '').replace(/\s/g, '_').toUpperCase();
                message = `PARAM_${message}`;

                return { error_code, message, param };
            });

            return { status, errors };
        }

        return super.errorResponse(data);
    }
}

module.exports = ValidationsErrorHandler;
