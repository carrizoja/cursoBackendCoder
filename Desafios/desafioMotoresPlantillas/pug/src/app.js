const express = require('express');

const app = express();
const ProductManager = require('./Managers/Products');
const server = app.listen(8080, () => console.log("Listening on 8080"))


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('views', './views')
app.set('view engine', 'pug')
const productService = new ProductManager();

app.get('/', async(req, res) => {
    const prods = await productService.get()
    console.log(prods); //Llegan los productos
    res.render("vista", {
        products: prods.payload,
        /* hayProducts: prods.length */
    })
})

app.post('/products', async(req, res) => {
    const newProduct = req.body
    await productService.add(newProduct)
    res.redirect('/')
})