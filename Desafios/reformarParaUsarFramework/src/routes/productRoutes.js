const express = require('express');

const controller = require('../controllers/product.controller');

const productRouter = express.Router();

productRouter.get('/', controller.getProducts);
productRouter.post('/', controller.postProduct);
productRouter.put('/', controller.putProduct);
productRouter.delete('/', controller.deleteProduct);

module.exports = productRouter;