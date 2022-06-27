// import containers from Mongo and MySql
// then import and export the classes

const ProductsApi = require('./src/services/products.service');
const MyMongoClient = require('./src/models/db/mongoClient');

let client = new MyMongoClient();
client.connected();

// services instance
let productsApi = new ProductsApi();

const execute = async() => {
    try {
        switch (cmd) {
            case 'get':
                console.log(await productsApi.get(id));
                break;
            case 'delete':
                console.log(await productsApi.delete(id));
                break;
            case 'add':
                console.log(await productsApi.add(data));
                break;

        }

    } catch (error) {
        console.log(error);
    }
}