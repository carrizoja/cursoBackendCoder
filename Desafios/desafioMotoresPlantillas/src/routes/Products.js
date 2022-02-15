const express = require('express');
const router = express.Router();
const ProductManager = require('../Managers/Products');
const uploader = require('../services/Upload');

const productService = new ProductManager();
router.get('/', (req, res) => {
    productService.get().then(result => res.send(result))
})


router.post('/', uploader.single('file'), (req, res) => {
    let product = req.body;
    let file = req.file;
    if (!file) return res.status(500).send({ error: "Couldn't upload file" })
    product.thumbnail = req.protocol + "://" + req.hostname + ":8080/img/" + file.filename;
    productService.add(product).then(result => res.send(result));
})



module.exports = router;