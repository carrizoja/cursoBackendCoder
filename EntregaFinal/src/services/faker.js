let faker = require('faker');
const { errorLog: loggerWinston } = require("../utils/loggers/winston");
const { productsDao } = require('../models/daos/index');

const generateFakerProducts = async() => {
    try {
        async function createObjects() {
            for (let i = 0; i < 6; i++) {
                let product = {
                    name: faker.commerce.productName(),
                    price: faker.commerce.price(100, 200, 0, '$'),
                    id: faker.datatype.number(10),
                    thumbnail: faker.image.imageUrl(1234, 2345, 'technology', true)
                }
                await productsDao.save(product);
            }

        }
        createObjects();
    } catch {
        loggerWinston.error(`Error at products creation`);
    }
}

module.exports = { generateFakerProducts };









/* 
router.get('/api/products-test', (req, res) => {
  
}) */