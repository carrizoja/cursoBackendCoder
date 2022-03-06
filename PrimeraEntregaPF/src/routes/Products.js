const express = require('express');
const router = express.Router();
const ProductManager = require('../Managers/Products');
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

// Ruta para borrar como admin

router.delete('/:num/user/:admin', (req, res) => {
    let param = req.params.num;
    let admin = req.params.admin
    if (admin !== "admin") return res.status(401).send({ error: "Access denied. You aren't an Admin" })
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    productService.deleteProduct(number).then(result => res.send(result))
})

router.delete('/:num/', (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    return res.status(401).send({ error: "Access denied. You aren't an Admin" })

})

router.post('/', uploader.single('file'), (req, res) => {
    let product = req.body;
    if (product.role !== "admin") return res.status(401).send({ error: "Access denied. You aren't an Admin" })

    let file = req.file;
    if (!file) return res.status(500).send({ error: "Couldn't upload file" })
    product.thumbnail = req.protocol + "://" + req.hostname + ":8080/img/" + file.filename;
    productService.add(product).then(result => res.send(result));
})

router.put('/:num/user/:admin', (req, res) => {
    let param = req.params.num;
    let admin = req.params.admin;
    if (admin !== "admin") return res.status(401).send({ error: "Access denied. You aren't an Admin" })
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    productService.updateProduct(number, req.body).then(result => res.send(result))
})

router.put('/:num', (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    return res.status(401).send({ error: "Access denied. You aren't an Admin" })
        /*   let number = parseInt(param);
          productService.updateProduct(number, req.body).then(result => res.send(result)) */
})



module.exports = router;