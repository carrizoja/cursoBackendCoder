const MongoDBContainer = require('../../containers/MongoDBContainer.js');
const Order = require('../../schemas/nosql/order.js');

class OrderDaoMongoDB {
    orderManager = new MongoDBContainer(Order);
    async getAll() {
        return await this.orderManager.getAll();
    }

    async getOrderByUsername(username) {
        return await this.orderManager.getOrderByUsername(username);
    }

    async save(order) {
        return await this.orderManager.save(order);
    }




}

module.exports = OrderDaoMongoDB;