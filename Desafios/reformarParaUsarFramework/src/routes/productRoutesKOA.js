const Router = require('koa-router');

const express = require('express');

const controller = require('../controllers/product.controller');

/* const productRouter = express.Router(); */
const productRouter = new Router();


/* const productRouter = new Router({
    prefix: "/api/products"
}); */

productRouter.get('/', controller.getProducts);
productRouter.post('/', controller.postProduct);
productRouter.put('/', controller.putProduct);
productRouter.delete('/', controller.deleteProduct);

module.exports = productRouter;