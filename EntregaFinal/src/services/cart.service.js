const { cartDao } = require('../models/daos')
class Cart {

    constructor() {
        this.storage = cartDao;
    }

    async getAll() {
        try {
            return await this.storage.getAll();
        } catch (error) {
            console.log(error);
        }
    }


    async save(data) {
        try {

            return await this.storage.save(data);
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, data) {
        try {
            return await this.storage.update(id, data);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            return await this.storage.deleteById(id);
        } catch (error) {
            console.log(error);
        }
    }
    async addProductToCart(idCart, idProduct) {
        try {
            return await this.storage.addProductToCart(idCart, idProduct);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductOnCart(idCart, idProduct) {
        try {
            return await this.storage.deleteProductOnCart(idCart, idProduct);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Cart();