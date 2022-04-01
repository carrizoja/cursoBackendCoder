const FsContainer = require('../../containers/fsContainer.js');
const path = require('path')
const cartsPath = path.join('files', 'carts.json')

class FsCartDao {
    cartManager = new FsContainer(cartsPath);

    async getAll() {
        return await this.cartManager.getAll();
    }

    async findById(id) {
        return await this.cartManager.findById(id);
    }

    async add(cart) {
        return await this.cartManager.add(cart);
    }

    async delete(id) {
        return await this.cartManager.delete(id);
    }

    async update(id, cart) {
        return await this.cartManager.update(id, cart);

    }

    async addProductToCart(idCart, idProduct) {
        return await this.cartManager.addProductToCart(idCart, idProduct);
    }

    async deleteProductOnCart(idCart, idProduct) {
        return await this.cartManager.deleteProductOnCart(idCart, idProduct);
    }



}

module.exports = FsCartDao;