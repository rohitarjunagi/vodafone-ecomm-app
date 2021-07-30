const mongoose = require('mongoose');

/**
 * User Schema
 * @private
 */
const userProductsSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    unique: true
  },
  basket: {
    basketId: {
      type: String,
      unique: true,
    },
    products: [
      {
        id: {
          type: String,
        },
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
  },
}, {
  timestamps: true,
});

/**
 * @typedef User
 */
module.exports = mongoose.model('UserProducts', userProductsSchema);
