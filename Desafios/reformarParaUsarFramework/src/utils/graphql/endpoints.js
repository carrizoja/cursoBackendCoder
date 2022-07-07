const service = require('../../services/product.service');

// Endpoints class

class Endpoints {
    getProducts = async() => {
        try {
            const products = await service.getAll();
            return products;
        } catch (error) {
            console.log(error);
        }
    }
    createProduct = async(data) => {
        try {
            const product = await service.save(data);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async(id, data) => {
        try {
            const product = await service.update(id, data);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async(id) => {
        try {
            await service.deleteById(id);
            return id;
        } catch (error) {
            console.log(error);
        }
    };


};

module.exports = new Endpoints();