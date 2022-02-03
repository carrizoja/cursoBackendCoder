const express = require('express');

const app = express();

const server = app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080")
})

const ProductManager = require('./productManager.js')

const productService = new ProductManager();

// file handler
//const pathToProducts = './files/products.json'
/*// if (fs.existsSync(pathToProducts)) {
    let data = await fs.promises.readFile(pathToProducts, 'utf-8')
    let products = JSON.parse(data); */
//console.log(pathToProducts);
/* const id = Math.floor(Math.random * 10) + 1 */
/* const id = Math.floor(
    Math.random() * (4 - 1) + 1
)
console.log(id); */
/* const product = array[id]  */

app.get('/products', (req, res) => {

    productService.findAll().then(result => res.send(result))
})

app.get('/randomProduct', (req, res) => {
    productService.findByIdRandomly().then(result => res.send(result))
})