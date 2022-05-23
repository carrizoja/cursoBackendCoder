const express = require('express');
const compression = require('compression');
require('dotenv').config();

const app = express();

app.use(compression());

app.get('/', (req, res) => {
    if (process.env.MODE_ENV === 'production') {
        res.send('Hello World'.repeat(1000));
    } else {
        res.send('Hello World');
    }


});

app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
})