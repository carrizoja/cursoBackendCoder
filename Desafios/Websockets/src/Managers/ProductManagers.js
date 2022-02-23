const fs = require('fs');
const productPath = __dirname + "/../files/products.json"


const fetch = async() => {
    let data = await fs.promises.readFile(productPath, 'utf-8');
    let products = JSON.parse(data);
    return products
}

class ProductManager {

    getAll = async() => {
        if (fs.existsSync(productPath)) {
            try {
                let products = await fetch();
                return { status: "success", payload: products }
            } catch (error) {
                return { status: "error", error: error }
            }
        }
    }

    add = async(product) => {
        if (fs.existsSync(productPath)) {
            try {
                let products = await fetch();
                if (products.length === 0) {
                    product.id = 1;
                    await fs.promises.writeFile(productPath, JSON.stringify([product], null, 2))
                    return { status: "success", message: "Product added" }
                }
                product.id = products[products.length - 1].id + 1;
                products.push(product);
                await fs.promises.writeFile(productPath, JSON.stringify(products, null, 2))
                return { status: "success", message: "Product added" }
            } catch (error) {
                return { status: "error", error: error }
            }

        }
        product.id = 1;
        await fs.promises.writeFile(productPath, JSON.stringify([product], null, 2))
        return { status: "success", message: "Product added" }
    }
}

module.exports = ProductManager;