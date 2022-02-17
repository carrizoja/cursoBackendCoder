const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const ProductManager = require('./Managers/Products');
const server = app.listen(8080, () => console.log("Listening on 8080"))
const productService = new ProductManager();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// ------------------------------------------
/* app.engine('handlebars', handlebars.engine()); */
/* app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
); */
const hbs = handlebars.create({ defaultLayout: 'index' });
app.engine('handlebars', hbs.engine);

app.set('views', './views')
app.set("view engine", "handlebars");

app.get('/products', async(req, res) => {
    const prods = await productService.get()
    console.log(prods);
    res.render('vista', {
        products: prods.payload,
    })
})

app.post('/products', async(req, res) => {
    const newProduct = req.body
    await productService.add(newProduct)
    res.redirect('/')
})