const express = require('express');
const moment = require('moment');
const app = express();

const server = app.listen(8080, () => {
    console.log("Listening on port 8080");
})

let counter = 0;

app.get('/', (req, res) => {
    res.send('<h1 style="color:blue;">Bienvenidos al servidor express</h1>')
})

app.get('/visitas', (req, res) => {
    counter++;
    res.send(`Has visitado este Endpoint ${counter} veces`)
})

app.get('/fyh', (req, res) => {
    let dateTime = moment();
    res.send({
        fyh: dateTime.format('DD/M/YYYY hh:mm:ss')
    })
})