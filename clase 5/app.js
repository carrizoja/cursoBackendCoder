const express = require('express');

const app = express();

const server = app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080")
})

const ProductManager = require('./productManager.js')

const productService = new ProductManager();

app.get('/products', (req, res) => {

    productService.findAll().then(result => res.send(result))
})

app.get('/randomProduct', (req, res) => {
    productService.findByIdRandomly().then(result => res.send(result))
})