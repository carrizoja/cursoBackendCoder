const MongoContainer = require('../../containers/mongoContainer.js');
const Product = require('../../models/products.js');

class MongoProductDao {
    productManager = new MongoContainer(Product);

    async getAll() {
        return await this.productManager.getAll();
    }

    async add(product) {
        return await this.productManager.add(product);
    }

    async delete(id) {
        return await this.productManager.delete(id);
    }

    async findById(id) {
        return await this.productManager.findById(id);
    }

    async update(id, product) {

        return await this.productManager.update(id, product);
    }
}

module.exports = MongoProductDao; // Singleton