const ProductDao = require('../models/daos/product.dao');
const RepositoryProduct = require('../models/repositories/product.repository');

class ProductsApi {
    constructor() {
        this.productDao = new ProductDao();
        this.productRepository = new RepositoryProduct();
    }

    // Methods

    async getAll() {
        let product = await this.productRepository.getAllRepository();
        return product;
    }

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