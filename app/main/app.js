const express = require('express');
const app = express();
const routers = {};
const config = require('./config');
const setup = require('./setup');

routers.v1 = express.Router();

config.configure(app, express, routers);

setup.setupDatabase();
/* generate inject routes */
routers.v1.use("/product", require('../api/v1/business/web_crawler/web_crawler_routes'));


/* health check */
routers.v1.route('/health').get((req, res) => res.status(200).send());



module.exports = app;
