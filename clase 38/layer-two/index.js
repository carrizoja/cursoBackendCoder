const express = require('express');
const app = express();
const routerProduct = require('./src/routes/products.Route');

app.use(express.json());
app.use('/api', routerProduct);

app.listen(8080, () => {
    console.log('Server is running');
})