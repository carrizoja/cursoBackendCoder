const express = require('express');
const app = express();
const { fork } = require('child_process');

app.listen(8080, () => {
    console.log('Listenin on port 8080');
})

let visitas = 0;
app.get('/', (req, res) => {
    res.send(`visitas ${++visitas}`);
})


const child = fork('./child.js');


app.get('/calculo-nobloq', (req, res) => {
    child.send('inizialize');
    child.on("message", childMsg => {
        res.send(`resultado ${childMsg}`);
    })
})