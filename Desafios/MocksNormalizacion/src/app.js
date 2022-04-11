const express = require('express');
const { Server } = require('socket.io');
const ProductManager = require('./Managers/ProductManagers.js')
const ChatManager = require('./Managers/ChatManagers.js')
const faker = require('faker');
faker.locale = "es";
const productService = new ProductManager();
const { commerce, image, datatype } = faker;

/* let objects = []; */

async function createObjects() {
    for (let i = 0; i < 6; i++) {
        let product = {
            name: commerce.productName(),
            price: commerce.price(100, 200, 0, '$'),
            id: datatype.number(10),
            thumbnail: image.imageUrl(1234, 2345, 'technology', true)
        }
        await productService.add(product);
    }

}
createObjects();


const app = express();
const server = app.listen(8080, () => {
    console.log("Listening on port 8080")
})
const io = new Server(server);
app.use(express.json());
app.use(express.static(__dirname + '/public'))

// Socket ya toma automáticamente json. No es necesario aclarar con app.use(express.JSON());
// Services

const chatService = new ChatManager();
io.on('connection', async socket => {
    console.log("Cliente conectado");
    let products = await productService.getAll();
    io.emit('productLog', products)
    socket.on('sendProduct', async data => { // Por cada emit del lado del index.js hago un socket.on
        await productService.add(data);
        let products = await productService.getAll();
        io.emit('productLog', products)
    })
    socket.on('sendUser', async data => {
        // insert json into file
        let author = {
            name: data.name,
            lastname: data.lastname,
            id: data.email,
            avatar: data.thumbnail,
            age: data.age,
            nickname: data.nickname

        }
        let chat = { author }
        await chatService.add(chat);
        let messages = await chatService.add();
        io.emit('messageLog', messages)
        let users = await chatService.get();
        let user = users.payload.find(u => u.author.nickname === data.nickname)
        io.emit('userLog', user.author.nickname)
    })

})



// Chatbox

let log = [];

io.on('connection', (socket) => {
    socket.broadcast.emit('newUser')
        // para emitir un evento a todos menos al mío. Por cada Emit va un ON del otro lado (front)
    socket.on('message', async data => {
        log.push(data);

        io.emit('log', log) // Con un io le llega a todos
        await chatService.add(data);
        console.log(data);


    })
    socket.on('registered', data => {
        socket.emit('log', log); // envía uno a uno (cliente a servidor)

    })
}); //evento para poner a escuchar el socket