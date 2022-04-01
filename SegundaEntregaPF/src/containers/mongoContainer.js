// MongoDb
require('dotenv').config();
const { mongoose } = require('mongoose');

// Database connection
mongoose.connect(
    process.env.MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected to mongoDB');
});

class MongoContainer {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return await this.model.find();
    }

    async add(product) {
        return await this.model.create(product);
    }
    async delete(id) {
        return await this.model.deleteOne({ _id: id });
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async update(id, product) {

        return await this.model.findOneAndUpdate(id, product);
    }

    async addProductToCart(idCart, idProduct) {
        return await this.model.findByIdAndUpdate(idCart, { $push: { products: idProduct } });
    }

    async deleteProductOnCart(idCart, idProduct) {

        return await this.model.findByIdAndUpdate(idCart, { $pull: { products: idProduct } });
    }
}


module.exports = MongoContainer;