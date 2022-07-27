const MongoDBContainer = require('../../containers/MongoDBContainer.js');
const Product = require('../../schemas/nosql/products.js');

class ProductsDaoMongoDB {
    productManager = new MongoDBContainer(Product);

    async getAll() {
        return await this.productManager.getAll();
    }

    async save(product) {
        return await this.productManager.save(product);
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

module.exports = ProductsDaoMongoDB; // Singleton