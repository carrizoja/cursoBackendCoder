const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrdersSchema = new Schema({
    products: [{}],
    timestamp: String,
    total: Number,
    address: String,
    email: String,
    status: Boolean,
    username: String,
});

const Order = mongoose.model('Order', OrdersSchema);

module.exports = Order;