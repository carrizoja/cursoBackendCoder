const express = require('express');
const compression = require('compression');

const app = express();

/* A middleware that compresses the response body. */
/* app.use(compression()); */

app.get("/saludo", (req, res) => {
    res.send(("Hola mundo").repeat(1000));
})

app.get("/saludoZip", compression(), (req, res) => {
    res.send(("Hola mundo").repeat(1000));
})

app.listen(8080, () => {
    console.log('Server running on port 8080');
})