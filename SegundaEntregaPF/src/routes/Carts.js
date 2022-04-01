const express = require('express');
const router = express.Router();
const { cartDao } = require('../daos/index.js');


// Obtain all carts

router.get('/', (req, res) => {
    cartDao.getAll().then(result => res.send(result))
})

// Get cart by id
router.get('/:num', async(req, res) => {
    let param = req.params.num;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    const cart = await cartDao.findById(number);
    res.json({
        cart,
        message: 'cart encontrado'
    })
})

// Delete Cart by id
router.delete('/:num', (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) {
        cartDao.delete(param).then(result => res.send(result));
    } else {
        let number = parseInt(param);
        cartDao.delete(number).then(result => res.send(result));
    }
})



// Add Cart
router.post('/', (req, res) => {
    let cart = req.body;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toUTCString();
    cart.date = today;
    cartDao.add(cart).then(result => res.send(result))

})

// update Cart
router.put('/:num', (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) {
        cartDao.update(param, req.body).then(result => res.send(result));
    } else {
        let number = parseInt(param);
        cartDao.update(number, req.body).then(result => res.send(result));
    }
})

// Post that adds a product to a cart
router.post('/:idCart/product/:idProduct', (req, res) => {
    let param1 = req.params.idCart;
    let param2 = req.params.idProduct;
    console.log(param1, param2)
    if (!isNaN(param1) && (!isNaN(param2))) {
        let idCart = parseInt(param1);
        let idProduct = parseInt(param2);
        return cartDao.addProductToCart(idCart, idProduct).then(result => res.send(result));
    } else if (isNaN(param1) && (isNaN(param2))) {
        if (param1.toString().length == 24 && param2.toString().length == 24) {
            return cartDao.addProductToCart(param1, param2).then(result => res.send(result));
        }
    } else return res.status(400).send({ error: "some parameter is wrong!" })

})

// Delete Product on Cart

router.delete('/:idCart/product/:idProduct', (req, res) => {
    let param1 = req.params.idCart;
    let param2 = req.params.idProduct;
    if (!isNaN(param1) && (!isNaN(param2))) {
        let idCart = parseInt(param1);
        let idProduct = parseInt(param2);
        return cartDao.deleteProductOnCart(idCart, idProduct).then(result => res.send(result));
    } else if (isNaN(param1) && (isNaN(param2))) {
        if (param1.toString().length == 24 && param2.toString().length == 24) {
            return cartDao.deleteProductOnCart(param1, param2).then(result => res.send(result));
        }

    } else return res.status(400).send({ error: "some parameter is wrong!" })


})





module.exports = router;