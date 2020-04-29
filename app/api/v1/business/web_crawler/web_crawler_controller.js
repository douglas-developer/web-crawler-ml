const BaseResourceController = require('../../base/base_resource_controller');
const Model = require("./web_crawler_model");
const WebCrawlerService = require('./web_crawler_service');
const WebCrawlerErrorHandler = require('./web_crawler_error_handler');


class WebCrawlerController extends BaseResourceController {
    constructor() {
        super(Model, new WebCrawlerErrorHandler());
        this.service = new WebCrawlerService();
    }

    async index(req, res, next) {
        try {
            let response = await this.service.index(req.body.search, req.body.limit)
            res.json(response);
        } catch (error) {
            next(this.handleError(error));
        }
    }
}

module.exports = WebCrawlerController;
