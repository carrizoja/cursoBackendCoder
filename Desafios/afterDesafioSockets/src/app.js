const express = require('express');
const { Server } = require('socket.io');
const PetManager = require('./Managers/PetManagers.js')



const app = express();
const server = app.listen(8080, () => {
    console.log("Listening on port 8080")
})
const io = new Server(server);

app.use(express.static(__dirname + '/public'))

// Socket ya toma automáticamente json. No es necesario aclarar con app.use(express.JSON());
// Services
const petService = new PetManager();
io.on('connection', async socket => {
    console.log("Cliente conectado");
    let pets = await petService.getAll();
    io.emit('petLog', pets)
    socket.on('sendPet', async data => { // Por cada emit del lado del index.js hago un socket.on
        await petService.add(data);
        let pets = await petService.getAll();
        io.emit('petLog', pets)
    })
})