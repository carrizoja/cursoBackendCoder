const express = require('express');

const app = express();

const server = app.listen(8080, () => console.log("Listening on port 8080"))

app.set('views', './views')
app.set('view engine', 'ejs')


let consultaFalsaDeInformacion = () => [
    { first_name: "Mauricio", family_name: "Espinosa", last_name: "Flores" }
]

app.get('/', (req, res) => {
    res.render('hello', {
        message: "Hola a todos"
    })
})

app.get('/users', (req, res) => {
    let users = consultaFalsaDeInformacion();
    res.render('users', {
        users
    })
})