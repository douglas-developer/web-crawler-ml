const Model = require("./web_crawler_model");
const BaseService = require('../../base/base_service');
const routes = require('../../../../utils/integration_routes');
const axios = require('axios');
const cheerio = require('cheerio');

class WebCrawlerService extends BaseService {
    constructor() {
        super();
        this.model = Model;
    }

    async index(search, limit = 20) {
        let filter = search.replace(/[,|\s]+/g, "-").toLowerCase();
        try {
            let product = await this.model.find({ $text: {$search: `${filter}`}}).limit(limit);
            if (product.length > 0) return product;
            let itens = await this.searchItens(search);
            await this.bulkUpsert(
                itens,
                r => ({
                    name: r.name
                })
            );
            return await this.model.find({ $text: {$search: `${filter}`}}).limit(limit);
        } catch (error) {
            console.log(error)
            throw new Error("ERROR_ON_GET_PRODUCT")
        }

    }

    async bulkUpsert(payload, filter) {
        return this.model.bulkWrite(payload.map(document => ({
            updateOne: {
                filter: filter ? filter(document) : { _id: document._id },
                update: document,
                upsert: true
            }
        })));
    }

    async searchItens(filter) {
        let object = [];

        try {
            let response = await axios.get(`${routes.MERCADO_LIVRE_URL_BASE}/${filter}#D[A:}${filter}]`);
            let $ = cheerio.load(response.data);
            await $('#searchResults li.article').each(async function () {
                let item = {
                    search: filter.replace(/[,|\s]+/g, "-").toLowerCase(),
                    imlID: $(this).find('div.rowItem').attr('id'),
                    link: $(this).find('.item__info-title').attr('href') || $(this).find('.images-viewer').attr('item-url'),
                    name: $(this).find('.list-view-item-title').text().trim(),
                    store: $(this).find('.item__brand-title-tos').text(),
                    price: $(this).find('div.item__price > span.price__fraction').text(),
                    state: $(this).find('.item__condition').text().trim(),
                }

                object.push(item)
            })
            return object;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = WebCrawlerService;
