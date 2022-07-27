const express = require('express');

const controller = require('../controllers/product.controller');

const productRouter = express.Router();

productRouter.get('/', controller.getProducts);
productRouter.get('/:id', controller.getProductById);
productRouter.post('/', controller.postProduct);
productRouter.put('/:id', controller.putProduct);
productRouter.delete('/:id', controller.deleteProduct);

module.exports = productRouter;