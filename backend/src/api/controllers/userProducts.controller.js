const httpStatus = require('http-status');
const UserProducts = require('../models/userProducts.model');

/**
 * Get userProduct
 * @public
 */
exports.getUserProducts = async (req, res, next) => {
  try {
    const userProducts = await UserProducts.find(req.query);
    const transformedUserProducts = userProducts.map((userProduct) => (
      transformUserProducts(userProduct)
    ));
    res.json(transformedUserProducts);
  } catch (error) {
    next(error);
  }
};

const transformUserProducts = (userProduct) => {
  let products = userProduct.basket.products || [];
  products = products.map((product) => (
    {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  ));
  return {
    customerId: userProduct.customerId,
    basket: {
      basketId: userProduct.basket.basketId,
      products,
    },
    createdAt: userProduct.createdAt,
  };
};

/**
 * Create new userProduct
 * @public
 */
exports.createUserProducts = async (req, res, next) => {
  try {
    const userProduct = new UserProducts(req.body);
    const savedUserProducts = await userProduct.save();
    res.status(httpStatus.CREATED);
    res.json(transformUserProducts(savedUserProducts));
  } catch (error) {
    next(error);
  }
};
