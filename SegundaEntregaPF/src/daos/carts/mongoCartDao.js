const MongoContainer = require('../../containers/mongoContainer.js');
const Cart = require('../../models/carts.js');

class MongoCartDao {
    cartManager = new MongoContainer(Cart);

    async getAll() {
        return await this.cartManager.getAll();
    }

    async add(cart) {
        return await this.cartManager.add(cart);
    }

    async delete(id) {
        return await this.cartManager.delete(id);
    }

    async findById(id) {
        return await this.cartManager.findById(id);
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

module.exports = MongoCartDao; // Singleton