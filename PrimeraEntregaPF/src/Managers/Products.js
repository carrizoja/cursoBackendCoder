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

    findById = async(id) => {
        let data = await fs.promises.readFile(pathToProducts, 'utf-8')
        let products = JSON.parse(data);

        let product = products.find(p => p.id === id)
        if (product) return { status: "sucess", payload: product }
        else return { status: "error", message: "product not found" }
    }

    updateProduct = async(id, updatedProduct) => {
        if (!id) return { status: "error", error: "ID needed" }
        const data = await this.get();
        const index = data.payload.findIndex(e => e.id === id)
        data.payload[index] = {...data.payload[index], ...updatedProduct }

        await fs.promises.writeFile(pathToProducts, JSON.stringify(data.payload, null, 2))
        return { status: "success", message: "Product updated" }

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

}

module.exports = ProductsManager;