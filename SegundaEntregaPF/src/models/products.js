const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    name: String,
    img: String,
    stock: Number,
    price: Number,
    description: String,
    timestamp: Date
});

const Product = mongoose.model('Product', ProductsSchema);

module.exports = Product;