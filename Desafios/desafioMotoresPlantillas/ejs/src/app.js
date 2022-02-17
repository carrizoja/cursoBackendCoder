const express = require('express');

const app = express();
const ProductManager = require('./Managers/Products');
const server = app.listen(8080, () => console.log("Listening on 8080"))

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const productService = new ProductManager();

app.get('/', async(req, res) => {
    const products = await productService.get()
    res.render('home', {
        /* users */
        products: products.payload
    })
})

app.post('/products', async(req, res) => {
    const newProduct = req.body
    console.log(newProduct);
    await productService.add(newProduct)
    res.redirect('/')
})