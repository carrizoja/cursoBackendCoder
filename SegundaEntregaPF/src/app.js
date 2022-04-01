const express = require('express');
const productsRouter = require('./routes/Products')
const cartsRouter = require('./routes/Carts')

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use(express.static(__dirname + '/public'));

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})