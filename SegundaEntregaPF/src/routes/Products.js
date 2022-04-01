const express = require('express');
const router = express.Router();
const { productDao } = require('../daos/index.js');
const { middlewareAuth } = require('../middlewares/middlewareProducts');
const uploader = require('../services/Upload');


// Get product by id
router.get('/:num', async(req, res) => {
    let param = req.params.num;
    if (isNaN(param)){
        productDao.findById(param).then(result => res.send(result));}
    else {
        let number = parseInt(param);
        const product = await productDao.findById(number);
        res.json({
            product,
            message: 'Product found'
        })
    } 
})

// Obtain all products
router.get('/', async(req, res) => {
    const product = await productDao.getAll();
    res.json({
        product,
        message: 'products list OK',
    });
});

// Delete product by id

router.delete('/:num', middlewareAuth, (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) {productDao.delete(param).then(result => res.send(result));}
    else{
        let number = parseInt(param);
    productDao.delete(number).then(result => res.send(result));
    }
    
    
})


// Add Product
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
    productDao.add(product).then(result => res.send(result));
})

// Update product by id
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

    if (isNaN(param)){
        productDao.update(param, product).then(result => res.send(result));}
    else {
        let number = parseInt(param);
        productDao.update(number, product).then(result => res.send(result))
    }
   
})

module.exports = router;