const cartService = require('../services/cart.service.js');

const getCarts = async(req, res) => {
    try {
        const response = await cartService.getAll();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

const postCart = async(req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) return res.status(400).send({ error: "There isn't any data" });

    try {
        const cart = req.body;
        await cartService.save(cart).then(result => res.send(result));

    } catch (error) {
        console.log(error);
    }
};

const putCart = async(req, res) => {

    try {

        let param = req.params.id;
        if (isNaN(param)) {
            await cartService.update(param, req.body).then(result => res.send(result));
        } else {
            let number = parseInt(param);
            await cartService.update(number, req.body).then(result => res.send(result));

        }
    } catch (error) {
        console.log(error);
    }
};

const deleteCart = async(req, res) => {
    try {
        const id = req.params.id;
        await cartService.deleteById(id).then(result => res.send(result));
    } catch (error) {
        console.log(error);
    }
};

// Post that adds a product to a cart

const postProductToCart = async(req, res) => {
    try {
        let param1 = req.params.idCart;
        let param2 = req.params.idProduct;
        if (!isNaN(param1) && (!isNaN(param2))) {
            let idCart = parseInt(param1);
            let idProduct = parseInt(param2);
            await cartService.addProductToCart(idCart, idProduct).then(result => res.send(result));
        } else if (isNaN(param1) && (isNaN(param2))) {
            if (param1.toString().length == 24 && param2.toString().length == 24) {
                await cartService.addProductToCart(param1, param2).then(result => res.send(result));

            }
        } else await res.status(400).send({ error: "some parameter is wrong!" })

    } catch (error) {
        console.log(error);
    }
}

// Delete Product on Cart
const deleteProductOnCart = async(req, res) => {
    try {
        let param1 = req.params.idCart;
        let param2 = req.params.idProduct;
        if (!isNaN(param1) && (!isNaN(param2))) {
            let idCart = parseInt(param1);
            let idProduct = parseInt(param2);
            await cartService.deleteProductOnCart(idCart, idProduct).then(result => res.send(result));
        } else if (isNaN(param1) && (isNaN(param2))) {
            if (param1.toString().length == 24 && param2.toString().length == 24) {
                await cartService.deleteProductOnCart(param1, param2).then(result => res.send(result));
            }

        } else await res.status(400).send({ error: "some parameter is wrong!" })
    } catch {
        console.log(error);
    }

};


module.exports = {
    getCarts,
    postCart,
    putCart,
    deleteCart,
    postProductToCart,
    deleteProductOnCart
}