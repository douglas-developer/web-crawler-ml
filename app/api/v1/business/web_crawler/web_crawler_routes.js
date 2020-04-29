const express = require("express");
const validate = require("express-validation");

const Controller = require('./web_crawler_controller');
const validation = require("./web_crawler_validation");

const Router = express.Router();
let controller = new Controller();

Router
    .route('/')
    .post(validate(validation.getItens), controller.index.bind(controller))



module.exports = Router;
