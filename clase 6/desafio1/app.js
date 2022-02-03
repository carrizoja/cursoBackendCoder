const express = require('express');

const app = express();

const server = app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080")
})

const sentence = 'Hola mundo cómo están';

app.get('/api/sentence', (req, res) => {
    res.send({ sentence: sentence });
})

app.get('/api/letters/:num', (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    res.send({ letter: sentence.charAt(number - 1) });
})

app.get('/api/words/:num', (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    let array = sentence.split(' ');
    res.send({ word: array[number - 1] });
})