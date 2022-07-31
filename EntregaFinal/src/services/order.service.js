const { orderDao } = require('../models/daos')
class Order {

    constructor() {
        this.storage = orderDao;
    }

    async getAll() {
        try {
            return await this.storage.getAll();
        } catch (error) {
            console.log(error);
        }
    }

    async getOrderByUsername(username) {
        try {
            return await this.storage.getOrderByUsername(username);
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

}

module.exports = new Order();