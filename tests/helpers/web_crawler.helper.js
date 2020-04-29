const Helper = require('./helper');

class WebCrawlerHelper extends Helper {
    constructor() {
        super('web_crawler');
    }

}

module.exports = new WebCrawlerHelper();
