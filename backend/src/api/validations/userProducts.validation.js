const Joi = require('joi');

const product = Joi.object().keys({
  id: Joi.string(),
  name: Joi.string(),
  price: Joi.number(),
});

module.exports = {

  // POST /v1/users
  createUserProducts: {
    body: {
      customerId: Joi.string(),
      basket: Joi.object().keys({
        basketId: Joi.string().required(),
        products: Joi.array().items(product),
      }),
    },
  },

  getUserProducts: {
    query: {
      customerId: Joi.string().required(),
    },
  },
};
