const express = require('express');

const controller = require('../controllers/cart.controller.js');

const cartRouter = express.Router();


cartRouter.get('/', controller.getCarts);
cartRouter.post('/', controller.postCart);
cartRouter.put('/:id', controller.putCart);
cartRouter.delete('/:id', controller.deleteCart);
cartRouter.delete('/:idCart/product/:idProduct', controller.deleteProductOnCart);
cartRouter.post('/:idCart/product/:idProduct', controller.postProductToCart);



module.exports = cartRouter;