const fs = require('fs');

const pathToProducts = __dirname + '/../files/products';

class ProductsManager {
    add = async(product) => {
        if (fs.existsSync(pathToProducts)) {
            try {
                let data = await fs.promises.readFile(pathToProducts, 'utf-8');
                let products = JSON.parse(data);
                if (products.length == 0) {
                    // Is the first products
                    product.id = 1;
                    products.push(product);
                    await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2))
                    return { status: "success", message: "Added 1 product" }
                }
                product.id = products[products.length - 1].id + 1;
                products.push(product);
                await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2));
                return { status: "success", message: "Added 1 product" };
            } catch (error) {
                return { status: "error", error: error }
            }


        } else {
            try {
                product.id = 1;
                await fs.promises.writeFile(pathToProducts, JSON.stringify([product], null, 2));
                return { status: "success", message: "Added 1 product" }

            } catch (error) {
                return { status: "error", error: error }
            }

        }
    }
    get = async() => {
        if (fs.existsSync(pathToProducts)) {
            try {
                let data = await fs.promises.readFile(pathToProducts, 'utf-8');
                let products = JSON.parse(data);
                return { status: "success", payload: products } //Payloads se usa para enviar info
            } catch (error) {
                return { status: "error", error: error }
            }
        } else {
            return { status: "success", payload: [] }
        }

    }
}

module.exports = ProductsManager;