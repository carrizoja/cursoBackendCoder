// MongoDb
require('dotenv').config();
const { mongoose } = require('mongoose');
const { ArrayTools, TimeTools } = require('../../utils/tools');

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

class MongoDBContainer {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            console.log("Error getAll() ", error);
        }

    }

    async save(object) {
        object.timestamp = TimeTools.getTimestamp();
        return await this.model.create(object);
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


module.exports = MongoDBContainer;