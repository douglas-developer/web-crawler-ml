const BaseErrorHandler = require('../../base/base_error_handler');
const routes = require('../../../../utils/integration_routes');

class WebCrawlerErrorHandler extends BaseErrorHandler {
    errorResponse(data) {
        let response = { key: 'ERROR_ON_PRODUCT' };

        return super.errorResponse(response);
    }
}

module.exports = WebCrawlerErrorHandler;
