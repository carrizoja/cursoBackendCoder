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
const path = require('path');
const { get } = require('http');


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
const publicPath = path.join(__dirname, 'public');
app.use('/', express.static(publicPath));
// req.body config
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

let users = [];

// -------------------------- Sesion in Mongo DB ---------------------------------------

app.use(session({
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://carrizoja:Sietepalabras155@codercluster18335.gtx5o.mongodb.net/mySessionsDatabase?retryWrites=true&w=majority',
        ttl: 30
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
        console.log(req.session.isAuth)
        next();
    } else {
        res.send(
            `<p>No autorizado</p></br><a href="/login">Iniciar sesion</a>`
        )
    }
}

// ---------------------------------------------------------------------------------------

// ----------------------------- Routes -------------------------------------------------

app.get('/', isAuth, (req, res) => {

    const error = req.session.error;
    delete req.session.error;
    res.sendFile(path.join(publicPath, '/profile.html'));

})

app.get('/register', (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.sendFile(path.join(publicPath, '/register.html'));
})

app.get('/profile', isAuth, (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.sendFile(path.join(publicPath, '/profile.html'));
})


app.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, '/login.html'));
})

app.post('/login', async(req, res) => {

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch === false) {
            res.send(
                `<h1>Las contraseñas no coinciden. Regrese al login </h1></br><a href="/login">Regresar a Login</a>`
            )
        } else {
            req.session.isAuth = true;
            req.session.email = email;
            res.redirect('/profile');
        }


    } else {
        res.send(
            `<h1>El usuario no existe. Debe registrarse</h1></br><a href="/register">Regresar a Registro</a>`
        )

    }


})

app.post('/register', async(req, res) => {
    const { username, email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
        res.send(
            `<h1>El usuario ${username} ya existe</h1></br><a href="/register">Regresar a Registro</a>&nbsp;&nbsp;<a href="/login">Ir a Login</a>`
        )

    } else {
        const hashedPsw = await bcrypt.hash(password, 12);

        user = new UserModel({
            username,
            email,
            password: hashedPsw
        });

        await user.save();
        return res.sendFile(path.join(publicPath, '/login.html'));
    }



})

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            throw err;
        }
        res.redirect('/');
    });
})



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