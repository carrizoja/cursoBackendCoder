const FsContainer = require('../../containers/fsContainer.js');
const path = require('path')
const productsPath = path.join('files', 'products.json')

class FsProductDao {
    productManager = new FsContainer(productsPath);

    async getAll() {
        return await this.productManager.getAll();
    }

    async findById(id) {
        return await this.productManager.findById(id);
    }

    async delete(id) {
        return await this.productManager.delete(id);
    }

    async update(id, product) {

        return await this.productManager.update(id, product);
    }

    async add(product) {

        return await this.productManager.add(product);
    }

}

// async addProduct(product) {
// 	return await this.productManager.addProduct(product);
// }

module.exports = FsProductDao;