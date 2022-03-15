const express = require('express');
const { Server } = require('socket.io');
const ProductManager = require('./Managers/ProductManagers.js')
const ChatManager = require('./Managers/ChatManagers.js')
const options = require('./options/mysqlconfig.js')
const knex = require('knex');
const optionsSqlite = require('./options/mysqlLite3config.js')


const app = express();
const server = app.listen(8080, () => {
    console.log("Listening on port 8080")
})
const io = new Server(server);
app.use(express.json());
app.use(express.static(__dirname + '/public'))

// Socket ya toma automáticamente json. No es necesario aclarar con app.use(express.JSON());
// Services
const productService = new ProductManager();
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
})

app.delete('/:num', (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    productService.deleteProduct(number).then(result => res.send(result))
})

app.put('/:num', (req, res) => {
    let param = req.params.num;
    let product = req.body;
    if (product.hasOwnProperty('name')) {
        if (product.name == "") {
            return res.status(500).send({ error: "There isn't a name for the product. Please insert a name" })
        }
    }
    if (product.hasOwnProperty('price')) {
        let price = parseInt(product.price);
        if (isNaN(price)) {
            return res.status(400).send({ error: "Not a valid number for price" })
        }
    }

    if (product.hasOwnProperty('thumbnail')) {
        if (product.description == "") {
            return res.status(500).send({ error: "There isn't a link of a product's photo. Please insert a valid link!" })
        }
    }

    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    productService.updateProduct(number, product).then(result => res.send(result))
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


    })
    socket.on('registered', data => {
        socket.emit('log', log); // envía uno a uno (cliente a servidor)

    })
}); //evento para poner a escuchar el socket


// SCRIPT MARIABD

const database = knex(options);

const processDatabase = async() => {
    let tableExists = await database.schema.hasTable('products');
    if (!tableExists) {
        await database.schema.createTable('products', table => {
            table.increments('id');
            table.string('name', 15).nullable(false);
            table.float('price');
            table.string('thumbnail', 245).nullable(false);

        })
    }



}

const sqlite3DB = knex(optionsSqlite);

const processDatabaseSqlite3 = async() => {
    let tableSqlite3Exists = await sqlite3DB.schema.hasTable('chats');
    if (!tableSqlite3Exists) {
        await sqlite3DB.schema.createTable('chats', table => {
            table.increments('id');
            table.string('user', 20).nullable(false);
            table.string('message', 245).nullable(false);

        })
    }

}

processDatabaseSqlite3();

processDatabase();