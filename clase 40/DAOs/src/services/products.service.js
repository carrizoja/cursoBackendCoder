const ProductDao = require('../models/daos/product.dao');

class ProductsApi {
    constructor() {
        this.productDao = new ProductDao();
    }

    // Methods
    async get(id) {
        let product
        if (id) {
            product = await this.productDao.getById(id);
        } else {
            product = await this.productDao.getAll();
        }
        return product;
    }

    async delete(id) {
        let product
        if (id) {
            product = await this.productDao.getById(id);
        } else {
            product = await this.productDao.getAll();
        }
        return product;
    }

    async add(data) {
        let product
        if (id) {
            product = await this.productDao.getById(id);
        } else {
            product = await this.productDao.getAll();
        }
        return product;
    }

}

module.exports = ProductsApi;