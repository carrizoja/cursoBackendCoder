const ProductDao = require('../daos/products.dao');

class RepositoryProduct {
    constructor() {
        this.productDao = new ProductDao();
    }

    async getAllRepository() {
        let product = await this.productDao.getAll();
        return product;
    }

}

module.exports = RepositoryProduct;