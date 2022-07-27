const express = require('express');
const path = require('path');
const controller = require('../controllers/faker.controller');

const fakerRouter = express.Router();

fakerRouter.get('/api/products-test', controller.getProducts_test);

module.exports = fakerRouter;


/* 
let faker = require('faker');
const { errorLog: loggerWinston } = require("../utils/loggers/winston");
const ProductManager = require('../Managers/ProductManagers.js');
const productService = new ProductManager();
const router = express.Router();


router.get('/api/products-test', (req, res) => {
    try {
        async function createObjects() {
            for (let i = 0; i < 6; i++) {
                let product = {
                    name: faker.commerce.productName(),
                    price: faker.commerce.price(100, 200, 0, '$'),
                    id: faker.datatype.number(10),
                    thumbnail: faker.image.imageUrl(1234, 2345, 'technology', true)
                }
                await productService.add(product);
            }

        }
        createObjects();
    } catch {
        loggerWinston.error(`Error at products creation`);
    }
})

module.exports = fakerRouter; */