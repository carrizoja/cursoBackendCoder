const express = require('express');
const { Server } = require('socket.io');
const ProductManager = require('./Managers/ProductManagers.js')
const ChatManager = require('./Managers/ChatManagers.js')
const faker = require('faker');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo');
const normalizr = require('normalizr');
faker.locale = "es";
const productService = new ProductManager();
const { commerce, image, datatype } = faker;
const UserModel = require('./models/User');
const bcrypt = require('bcryptjs');
const connectWithMongo = require('./config/db');
const { response } = require('express');
const path = require('path');
const { pathToFileURL } = require('url');


// -------------- create Faker Objects --------------

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

// -----------------------------------------------------


const app = express();
connectWithMongo.connectWithMongo();
const server = app.listen(8080, () => {
    console.log("Listening on port 8080")
})
const io = new Server(server);
app.use(express.json());
/* app.use(express.static(__dirname + '/public')) */
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

let users = [];

// -------------------------- Sesion in Mongo DB ---------------------------------------

app.use(session({
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://carrizoja:Sietepalabras155@codercluster18335.gtx5o.mongodb.net/mySessionsDatabase?retryWrites=true&w=majority',
        ttl: 20
    }),
    secret: 'mongosecretcoderfeliz2022',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 20000
    }
}))

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/login');
    }
}

// ---------------------------------------------------------------------------------------

// ----------------------------- Routes -------------------------------------------------
app.get('/', isAuth, (req, res) => {
    req.session.isAuth = true;
    req.session.cualquierCosa = { a: 3, c: 1 }
    const error = req.session.error;
    delete req.session.error;
    res.sendFile(path.join(publicPath, '/index.html'));

})
app.get('/register', (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.sendFile(path.join(publicPath, '/register.html'));
})


app.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, '/login.html'));
})

app.post('/loginForm', async(req, res) => {

    const { email, password } = req.body;
    console.log(email, password);
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
        return res.sendFile(path.join(publicPath, '/login.html'));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.sendFile(path.join(publicPath, '/login.html'));
    }

    res.sendFile(path.join(publicPath, '/index.html'));

})

app.post('/registerForm', async(req, res) => {
    const { username, email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (user) {
        res.sendFile(path.join(publicPath, '/register.html'));
    }

    const hashedPsw = await bcrypt.hash(password, 12);

    user = new UserModel({
        username,
        email,
        password: hashedPsw
    });

    await user.save();
    return res.sendFile(path.join(publicPath, '/login.html'));

})

/* app.post('/logout', (req, res) => {
    req.seesion.destroy(err => {
        if (err) {
            throw err;
        }
        res.redirect('/login');
    });
}) */

// ----------------------------------End Routes ------------------------------------------------------

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
        await chatService.add(data);
        // Normalization process
        let chats = await chatService.get();
        chats = chats.payload;

        const author = new normalizr.schema.Entity('author');
        const mesagges = new normalizr.schema.Entity('mesagges', {
            author: author,
        });
        const normalizedData = normalizr.normalize(chats, [mesagges]);

        ;
        io.emit('log', log) // Con un io le llega a todos
        io.emit('normalizedData', normalizedData)

    })
    socket.on('registered', async data => {

        socket.emit('log', log); // envía uno a uno (cliente a servidor)

    })
}); //evento para poner a escuchar el socket