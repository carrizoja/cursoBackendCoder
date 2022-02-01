const { response, request } = require('express');
const express = require('express');

const app = express();

const connectedServer = app.listen(8080, () => {
    console.log("listening on port  8080");
})

app.get('/', (request, response) => {
    response.send("Hola");
})
app.get('/papaconqueso', (request, response) => {
    response.send("Papa con queso");
})
app.get('/user', (request, response) => {
    response.send({
        nombre: "José",
        apellido: "Carrizo",
        edad: 39,
        correo: "carrizoja@gmail.com"

    })

})

app.get('/pets', (req, res) => {
    res.send({ pets: ["perro", "gato"] })
})