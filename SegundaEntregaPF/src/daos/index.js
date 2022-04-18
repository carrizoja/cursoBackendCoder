const MongoProductDao = require('./products/mongoProductDao.js');
const MongoCartDao = require('./carts/mongoCartDao.js');
const fsProducts = require('./products/fsProducts.js')
const fsCarts = require('./carts/fsCarts.js')
const dbToUse = 'mongo';

let productDao;
let cartDao;

switch (dbToUse) {
    case 'mongo':
        productDao = new MongoProductDao();
        cartDao = new MongoCartDao();
        break;
    case 'fs':
        productDao = new fsProducts();
        cartDao = new fsCarts();
        break;
    default:
        break;
}

module.exports = { productDao, cartDao };