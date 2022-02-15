const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const server = app.listen(8080, () => {
    console.log("listening to handlebars");
})

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

let llamadaABaseDeDatos = () => {
    return [
        { first_name: "Mauricio", last_name: "Espinosa", age: 25 },
        { first_name: "José", last_name: "Carrizo", age: 29 }
    ]
}


app.get('/', (req, res) => {
    res.render('home')
})
app.get('/users', (req, res) => {
    // Aquí supongo que tomé datos de mi archivo
    let users = llamadaABaseDeDatos();
    res.send(users);
    res.render('users', { users: users });


})