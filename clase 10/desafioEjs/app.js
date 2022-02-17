const express = require('express');

const app = express();

const server = app.listen(8080, () => console.log("Listening on 8080"))

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

let users = [];

app.get('/', (req, res) => {

    res.render('home', {
        users
    })
})

app.post('/users', (req, res) => {
    users.push(req.body);
    res.redirect('/')
})