const { productsDao } = require('../models/daos/index');

class Product {
    constructor() {
        this.storage = productsDao;
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
            delete data.btnSubmit;
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

    async getById(id) {
        try {
            return await this.storage.getById(id);
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new Product();