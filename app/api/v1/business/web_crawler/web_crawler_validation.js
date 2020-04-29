const Joi = require("joi");

module.exports = {
  getItens : {
    body: {
        search: Joi.string().required(),
        limit: Joi.number()
    }
  }
};
