const fs = require('fs');
const FsContainer = require('../../containers/FSContainer.js');
const CartDto = require('../../dtos/CartDto.js');
const path = require('path')
const cartsPath = path.join('files', 'carts.json')
const pathToProducts = __dirname + '/../../../files/products.json';

class CartDaoFS extends FsContainer {
    constructor() {

        super(cartsPath);
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);

            return new CartDto(result);
        } catch (error) {
            console.log("Error getById() on CartsDaoFS", error);
        }
    }

    async getAll() {
        try {
            const results = await super.getAll();
            const dtos = results.map(result => {
                return new CartDto(result);
            });

            return dtos;
        } catch (error) {
            console.log("Error getAll() on CartsDaoFS", error);
        }
    }

    addProductToCart = async(idCart, idProduct) => {
        if ((!idCart) || (!idProduct)) return { status: "error", error: "Ids needed" }
        if (fs.existsSync(this.fileName)) {

            try {
                let dataCarts = await fs.promises.readFile(this.fileName, 'utf-8')
                let carts = JSON.parse(dataCarts);
                let cart = carts.elements.find(c => c.id === idCart)
                if (cart) {
                    let dataProducts = await fs.promises.readFile(pathToProducts, 'utf-8')
                    let products = JSON.parse(dataProducts);
                    let product = products.elements.find(p => p.id === idProduct)
                    if (product) {
                        cart.products.push(product.id);
                        await fs.promises.writeFile(this.fileName, JSON.stringify(carts, null, 2))

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

    deleteProductOnCart = async(idCart, idProduct) => {
        if ((!idCart) || (!idProduct)) return { status: "error", error: "Ids needed" }
        if (fs.existsSync(this.fileName)) {
            try {
                let dataCarts = await fs.promises.readFile(this.fileName, 'utf-8')
                let carts = JSON.parse(dataCarts);
                let cart = carts.elements.find(c => c.id === idCart)
                console.log(cart);
                let newProducts = cart.products.filter(p => p !== idProduct);
                cart.products = [];
                cart.products = JSON.parse(JSON.stringify(newProducts));
                if (cart) {
                    await fs.promises.writeFile(this.fileName, JSON.stringify(carts, null, 2))
                    return { status: "success", payload: cart }
                } else return { status: "error", message: "cart not found" }
            } catch (error) {
                return { status: "error", error: error }
            }

        } else {
            try {
                cart.id = 1;
                cart.products = [];
                await fs.promises.writeFile(this.file, JSON.stringify([cart], null, 2));
                return { status: "success", message: "Added 1 cart" }

            } catch (error) {
                return { status: "error", error: error }
            }

        }
    }



    async disconnect() {

    }



}

module.exports = CartDaoFS;