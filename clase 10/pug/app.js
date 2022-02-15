const express = require('express');

const app = express();

/* const PORT = 8080; */

const server = app.listen(8080, () => {
    console.log(`Listening on 8080`)
})

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('hello', {
        message: "Holo coders"
    })
})

app.get('/datos', (req, res) => {
    let { min, nivel, max, titulo } = req.query
    res.render('progress', {
        min: min,
        nivel: nivel,
        max: max,
        titulo: titulo
    })
})