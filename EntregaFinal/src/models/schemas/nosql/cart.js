const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartsSchema = new Schema({
    products: [{}],
    timestamp: String,
    total: Number,
    address: String,
    email: String,
    username: String,
});

const Cart = mongoose.model('Cart', CartsSchema);

module.exports = Cart;