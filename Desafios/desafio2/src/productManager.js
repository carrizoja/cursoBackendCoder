const fs = require('fs');

/* 
Schema
product =  {
    title: String,
    price: Number,
    thumbnail: String,
    
} */

// file handler
const pathToProducts = './files/products.json'
class ProductManager {
    // Poner Async para que trabaje de modo Asíncrono
    createProduct = async(product) => {
        // Validations
        if (!product.title || !product.price || !product.thumbnail) return { status: "error", error: "missing fields" }
        try {
            if (fs.existsSync(pathToProducts)) {
                let data = await fs.promises.readFile(pathToProducts, 'utf-8')
                let products = JSON.parse(data);
                let id = products[products.length - 1].id + 1
                product.id = id;
                products.push(product);
                await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2))
                return { status: "success", message: `product created - product id is ${product.id}` }
            } else { // El archivo no existe
                product.id = 1
                await fs.promises.writeFile(pathToProducts, JSON.stringify([product], null, 2))
                return { status: "success", message: `product created - product id is ${product.id}` }
            }
        } catch (error) {
            return { status: "error", message: error }
        }
    }

    findAll = async() => {
        if (fs.existsSync(pathToProducts)) {
            let data = await fs.promises.readFile(pathToProducts, 'utf-8')
            let products = JSON.parse(data);
            return { status: "success", payload: products }
        }

    }

    findById = async(id) => {
        let data = await fs.promises.readFile(pathToProducts, 'utf-8')
        let products = JSON.parse(data);

        let product = products.find(p => p.id === id)
        if (product) return { status: "sucess", payload: product }
        else return { status: "error", message: "product not found" }
    }

    updateProduct = async(id, updatedProduct) => {
        if (!id) return { status: "error", error: "ID needed" }
        if (fs.existsSync(pathToProducts)) {
            let data = await fs.promises.readFile(pathToProducts, 'utf-8')
            let products = JSON.parse(data);
            let newProducts = products.map((product) => {
                if (product.id === id) {
                    // Este se modifica
                    updatedProduct.id == id;
                    return updatedProduct;
                } else {
                    return product
                }
            })
            await fs.promises.writeFile(pathToProducts, JSON.stringify(newProducts, null, 2))
            return { status: "success", message: "Product updated" }
        }
    }

    deleteProduct = async(id) => {
        if (!id) return { status: "error", error: "ID needed" }
        if (fs.existsSync(pathToProducts)) {
            let data = await fs.promises.readFile(pathToProducts, 'utf-8')
            let products = JSON.parse(data);
            let newProducts = products.filter(product => product.id !== id)
            await fs.promises.writeFile(pathToProducts, JSON.stringify(newProducts, null, 2))
            return { status: "success", message: "Product deleted" }
        }


    }

    deleteAllProducts = async() => {
        try {
            if (fs.existsSync(pathToProducts)) {
                await fs.promises.writeFile(pathToProducts, JSON.stringify([], null, 2))
                return { status: "success", message: `Products has been deleted` }

            } else { // El archivo no existe

                return { status: "failed", message: `The file doesn't exist` }
            }
        } catch (error) {
            return { status: "error", message: error }
        }
    }
}

module.exports = ProductManager;