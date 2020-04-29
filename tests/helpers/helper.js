const supertest = require("supertest");
const app = require("../../app/main/app");
const faker = require("faker");
const mongoose = require("mongoose");


class Helper {
    constructor(model) {
        this.apiServer = supertest(app);
    }


}

module.exports = Helper;
