const express = require('express');
const { Server } = require('socket.io');
const ProductManager = require('./Managers/ProductManagers.js')

const app = express();
const server = app.listen(8080, () => {
    console.log("Listening on port 8080")
})
const io = new Server(server);

app.use(express.static(__dirname + '/public'))

// Socket ya toma automáticamente json. No es necesario aclarar con app.use(express.JSON());
// Services
const productService = new ProductManager();
io.on('connection', async socket => {
    console.log("Cliente conectado");
    let products = await productService.getAll();
    io.emit('productLog', products)
    socket.on('sendProduct', async data => { // Por cada emit del lado del index.js hago un socket.on
        await productService.add(data);
        console.log(data)
        let products = await productService.getAll();
        io.emit('productLog', products)
    })
})


// Chatbox

let log = [];

io.on('connection', (socket) => {
    socket.broadcast.emit('newUser')
        // para emitir un evento a todos menos al mío. Por cada Emit va un ON del otro lado (front)
    socket.on('message', data => {
        log.push(data);
        io.emit('log', log) // Con un io le llega a todos
    })
    socket.on('registered', data => {
        socket.emit('log', log); // envía uno a uno (cliente a servidor)
    })
}); //evento para poner a escuchar el socket