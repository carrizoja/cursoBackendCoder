const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    name: String,
    thumbnail: String,
    price: String,
    description: String,
    timestamp: String,
    category: String
});

const Product = mongoose.model('Product', ProductsSchema);

module.exports = Product;