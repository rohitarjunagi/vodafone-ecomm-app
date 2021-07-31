const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/userProducts.controller');
const {
  createUserProducts,
  getUserProducts,
} = require('../../validations/userProducts.validation');

const router = express.Router();

router
  .route('/')
  .post(validate(createUserProducts), controller.createUserProducts)
  .get(validate(getUserProducts), controller.getUserProducts);

module.exports = router;
