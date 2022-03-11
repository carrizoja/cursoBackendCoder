const express = require('express');
const router = express.Router();
const ProductManager = require('../Managers/Products');
const { middlewareAuth } = require('../middlewares/middlewareProducts');
const uploader = require('../services/Upload');



const productService = new ProductManager();
router.get('/', (req, res) => {
    productService.get().then(result => res.send(result))
})

router.get('/:num', (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    console.log(number);
    productService.findById(number).then(result => res.send(result))
})

router.delete('/:num', middlewareAuth, (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    productService.deleteProduct(number).then(result => res.send(result))
})

router.post('/', middlewareAuth, uploader.single('file'), (req, res) => {
    let product = req.body;
    let price = parseInt(product.price);
    let stock = parseInt(product.stock);
    if (product.name == "") return res.status(500).send({ error: "There isn't a name for the product. Please insert a name" })
    if (isNaN(price)) return res.status(400).send({ error: "Not a valid number for price" })
    if (isNaN(stock)) return res.status(400).send({ error: "Not a valid number for stock" })
    if (product.description == "") return res.status(500).send({ error: "There isn't a description for the product. Please insert something!" })
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toUTCString();
    product.timestamp = today;

    let file = req.file;
    if (!file) return res.status(500).send({ error: "Couldn't upload file" })
    product.thumbnail = req.protocol + "://" + req.hostname + ":8080/img/" + file.filename;
    productService.add(product).then(result => res.send(result));
})

router.put('/:num', middlewareAuth, (req, res) => {
    let param = req.params.num;
    let product = req.body;


    if (product.hasOwnProperty('name')) {
        if (product.name == "") {
            return res.status(500).send({ error: "There isn't a name for the product. Please insert a name" })
        }
    }
    if (product.hasOwnProperty('price')) {
        let price = parseInt(product.price);
        if (isNaN(price)) {
            return res.status(400).send({ error: "Not a valid number for price" })
        }
    }
    if (product.hasOwnProperty('stock')) {
        let stock = parseInt(product.stock);
        if (isNaN(stock)) {
            return res.status(400).send({ error: "Not a valid number for stock" })
        }
    }
    if (product.hasOwnProperty('description')) {
        if (product.description == "") {
            return res.status(500).send({ error: "There isn't a description of a product. Please insert something!" })
        }
    }

    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    productService.updateProduct(number, product).then(result => res.send(result))
})

module.exports = router;