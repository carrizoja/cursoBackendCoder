// fs

const fs = require('fs');

const pathToProducts = __dirname + '/../files/products.json';

class fsContainer {
    constructor(file) {
        this.file = file;
    }


    getAll = async() => {
        try {
            const getObjects = await fs.promises.readFile(this.file, 'utf-8', null, 2);
            const objects = JSON.parse(getObjects);
            return {
                status: 'success',
                payload: objects
            }
        } catch (error) {
            console.log(error)
        }
    }

    findById = async(id) => {
        try {
            const getObjects = await fs.promises.readFile(this.file, 'utf-8', null, 2);
            const objects = JSON.parse(getObjects);
            let object = objects.find(o => o.id === id)
            if (object) return { status: "sucess", payload: object }
            else return { status: "error", message: "Object not found" }
        } catch (error) {
            console.log(error)
        }
    }

    delete = async(id) => {
        if (!id) return { status: "error", error: "ID needed" }
        let getObjects = await fs.promises.readFile(this.file, 'utf-8', null, 2)
        let objects = JSON.parse(getObjects);
        let newObjects = objects.filter(o => o.id !== id)
        await fs.promises.writeFile(this.file, JSON.stringify(newObjects, null, 2))
        return { status: "success", message: "Object deleted" }

    }

    update = async(id, updatedObject) => {
        if (!id) return { status: "error", error: "ID needed" }
        const data = await this.getAll();
        const index = data.payload.findIndex(e => e.id === id)
        data.payload[index] = {...data.payload[index], ...updatedObject }

        await fs.promises.writeFile(this.file, JSON.stringify(data.payload, null, 2))
        return { status: "success", message: "Object updated" }

    }

    add = async(object) => {
        if (fs.existsSync(this.file)) {
            try {
                let data = await fs.promises.readFile(this.file, 'utf-8');
                let objects = JSON.parse(data);
                if (objects.length == 0) {
                    // Is the first products
                    object.id = 1;
                    objects.push(object);
                    await fs.promises.writeFile(this.file, JSON.stringify(objects, null, 2))
                    return { status: "success", message: "Added 1 object" }
                }
                object.id = objects[objects.length - 1].id + 1;
                objects.push(object);
                await fs.promises.writeFile(this.file, JSON.stringify(objects, null, 2));
                return { status: "success", message: "Added 1 object" };
            } catch (error) {
                return { status: "error", error: error }
            }


        } else {
            try {
                object.id = 1;
                await fs.promises.writeFile(this.file, JSON.stringify([object], null, 2));
                return { status: "success", message: "Added 1 object" }

            } catch (error) {
                return { status: "error", error: error }
            }

        }
    }

    addProductToCart = async(idCart, idProduct) => {
        if ((!idCart) || (!idProduct)) return { status: "error", error: "Ids needed" }
        if (fs.existsSync(this.file)) {
            try {
                let dataCarts = await fs.promises.readFile(this.file, 'utf-8')
                let carts = JSON.parse(dataCarts);
                let cart = carts.find(c => c.id === idCart)
                if (cart) {
                    let dataProducts = await fs.promises.readFile(pathToProducts, 'utf-8')
                    let products = JSON.parse(dataProducts);
                    let product = products.find(p => p.id === idProduct)
                    if (product) {
                        cart.products.push(product.id);
                        await fs.promises.writeFile(this.file, JSON.stringify(carts, null, 2))

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
        if (fs.existsSync(this.file)) {
            try {
                let dataCarts = await fs.promises.readFile(this.file, 'utf-8')
                let carts = JSON.parse(dataCarts);
                let cart = carts.find(c => c.id === idCart)
                let newProducts = cart.products.filter(p => p !== idProduct);
                cart.products = [];
                cart.products = JSON.parse(JSON.stringify(newProducts));
                if (cart) {
                    await fs.promises.writeFile(this.file, JSON.stringify(carts, null, 2))
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


}


module.exports = fsContainer;