const express = require('express');
const handlebars = require('express-handlebars');
const productsRouter = require('./routes/Products')

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/products', productsRouter);
/* app.use(express.static(__dirname + '/public'));  */
/* app.use(express.static(__dirname + '/views')); */

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.get('/products', (req, res) => {
    const prods = productsRouter.get()

    res.render("vista", {
        products: prods,
        ThereAreProducts: prods.length
    });
})

// ---------------------------------------------------

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})