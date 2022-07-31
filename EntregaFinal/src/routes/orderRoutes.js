const express = require('express');

const controller = require('../controllers/order.controller.js');

const orderRouter = express.Router();


orderRouter.get('/', controller.getOrders);
orderRouter.get('/:username', controller.getOrderByUsername);
orderRouter.post('/', controller.postOrder);


module.exports = orderRouter;