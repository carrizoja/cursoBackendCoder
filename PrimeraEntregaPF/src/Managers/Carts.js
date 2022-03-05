const fs = require('fs');

const pathToCarts = __dirname + '/../files/carts';
const pathToProducts = __dirname + '/../files/products';

class CartsManager {
    add = async(cart) => {
        if (fs.existsSync(pathToCarts)) {
            try {
                let data = await fs.promises.readFile(pathToCarts, 'utf-8');
                let carts = JSON.parse(data);
                if (carts.length == 0) {
                    // Is the first carts
                    cart.id = 1;
                    cart.products = [];
                    console.log(cart);
                    carts.push(cart);
                    await fs.promises.writeFile(pathToCarts, JSON.stringify(carts, null, 2))
                    return { status: "success", message: "Added 1 cart" }
                }
                cart.id = carts[carts.length - 1].id + 1;
                cart.products = [];
                carts.push(cart);
                await fs.promises.writeFile(pathToCarts, JSON.stringify(carts, null, 2));
                return { status: "success", message: "Added 1 cart" };
            } catch (error) {
                return { status: "error", error: error }
            }


        } else {
            try {
                cart.id = 1;
                cart.products = [];
                await fs.promises.writeFile(pathToCarts, JSON.stringify([cart], null, 2));
                return { status: "success", message: "Added 1 cart" }

            } catch (error) {
                return { status: "error", error: error }
            }

        }
    }
    get = async() => {
        if (fs.existsSync(pathToCarts)) {
            try {
                let data = await fs.promises.readFile(pathToCarts, 'utf-8');
                let carts = JSON.parse(data);
                return { status: "success", payload: carts }
            } catch (error) {
                return { status: "error", error: error }
            }
        } else {
            return { status: "success", payload: [] }
        }

    }

    findById = async(id) => {
        let data = await fs.promises.readFile(pathToCarts, 'utf-8')
        let carts = JSON.parse(data);

        let cart = carts.find(p => p.id === id)
        if (cart) return { status: "sucess", payload: cart }
        else return { status: "error", message: "cart not found" }
    }

    updateCart = async(id, updatedCart) => {
        if (!id) return { status: "error", error: "ID needed" }
        const data = await this.get();
        const index = data.payload.findIndex(e => e.id === id)
        data.payload[index] = {...data.payload[index], ...updatedCart }

        await fs.promises.writeFile(pathToCarts, JSON.stringify(data.payload, null, 2))
        return { status: "success", message: "Cart updated" }

    }

    deleteCart = async(id) => {
        if (!id) return { status: "error", error: "ID needed" }
        if (fs.existsSync(pathToCarts)) {
            let data = await fs.promises.readFile(pathToCarts, 'utf-8')
            let carts = JSON.parse(data);
            let newCarts = carts.filter(cart => cart.id !== id)
            await fs.promises.writeFile(pathToCarts, JSON.stringify(newCarts, null, 2))
            return { status: "success", message: "Cart deleted" }
        }


    }

    deleteProduct = async(idCart, idProduct) => {
        if ((!idCart) || (!idProduct)) return { status: "error", error: "Ids needed" }
        if (fs.existsSync(pathToCarts)) {
            try {
                let dataCarts = await fs.promises.readFile(pathToCarts, 'utf-8')
                let carts = JSON.parse(dataCarts);
                let cart = carts.find(c => c.id === idCart)
                let newProducts = cart.products.filter(p => p !== idProduct);
                cart.products = [];
                cart.products = JSON.parse(JSON.stringify(newProducts));
                if (cart) {
                    await fs.promises.writeFile(pathToCarts, JSON.stringify(carts, null, 2))
                    return { status: "success", payload: cart }
                } else return { status: "error", message: "cart not found" }
            } catch (error) {
                return { status: "error", error: error }
            }

        } else {
            try {
                cart.id = 1;
                cart.products = [];
                await fs.promises.writeFile(pathToCarts, JSON.stringify([cart], null, 2));
                return { status: "success", message: "Added 1 cart" }

            } catch (error) {
                return { status: "error", error: error }
            }

        }
    }

    addProduct = async(idCart, idProduct) => {
        if ((!idCart) || (!idProduct)) return { status: "error", error: "Ids needed" }
        if (fs.existsSync(pathToCarts)) {
            try {
                let dataCarts = await fs.promises.readFile(pathToCarts, 'utf-8')
                let carts = JSON.parse(dataCarts);

                let cart = carts.find(c => c.id === idCart)
                if (cart) {
                    let dataProducts = await fs.promises.readFile(pathToProducts, 'utf-8')
                    let products = JSON.parse(dataProducts);
                    let product = products.find(p => p.id === idProduct)
                    if (product) {
                        cart.products.push(product.id);
                        await fs.promises.writeFile(pathToCarts, JSON.stringify(carts, null, 2))

                        return { status: "sucess", payload: cart }
                    } else return { status: "error", message: "product not found" }

                } else return { status: "error", message: "cart not found" }

            } catch (error) {
                return { status: "error", error: error }
            }


        } else {
            try {
                cart.id = 1;
                cart.products = [];
                await fs.promises.writeFile(pathToCarts, JSON.stringify([cart], null, 2));
                return { status: "success", message: "Added 1 cart" }

            } catch (error) {
                return { status: "error", error: error }
            }

        }
    }


}

module.exports = CartsManager;