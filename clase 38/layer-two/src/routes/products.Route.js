const express = require('express');
const router = express.Router();
const { getDataControllers, postDataControllers } = require('../controllers/products.Controller');

router.get('/', getDataControllers);

router.post('/', postDataControllers);

module.exports = router;