const MongoDBContainer = require('../../containers/MongoDBContainer.js');
const Cart = require('../../schemas/nosql/cart.js');

class CartDaoMongoDB {
    cartManager = new MongoDBContainer(Cart);
    async getAll() {
        return await this.cartManager.getAll();
    }

    async save(cart) {
        return await this.cartManager.save(cart);
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

module.exports = CartDaoMongoDB;