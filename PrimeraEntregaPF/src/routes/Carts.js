const express = require('express');
const router = express.Router();
const CartManager = require('../Managers/Carts');

const cartService = new CartManager();
router.get('/', (req, res) => {
    cartService.get().then(result => res.send(result))
})

router.get('/:num', (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    console.log(number);
    cartService.findById(number).then(result => res.send(result))
})

router.delete('/:num', (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    cartService.deleteCart(number).then(result => res.send(result))
})

router.post('/', (req, res) => {
    let cart = req.body;
    cartService.add(cart).then(result => res.send(result));
})

// Post que agrega productos en el carrito
router.post('/:idCart/product/:idProduct', (req, res) => {
    let param1 = req.params.idCart;
    if (isNaN(param1)) return res.status(400).send({ error: "Not a number" })
    let idCart = parseInt(param1);
    let param2 = req.params.idProduct;
    if (isNan(param2)) return res.status(400).send({ error: "Not a number" })
    let idProduct = parseInt(param2)
    cartService.addProduct(idCart, idProduct).then(result => res.send(result));
})

router.put('/:num', (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    cartService.updateCart(number, req.body).then(result => res.send(result))
})



module.exports = router;