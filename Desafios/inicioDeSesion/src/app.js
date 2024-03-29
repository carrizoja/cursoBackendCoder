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
const passport = require('passport');
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;


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

// -------------------------- Sesion in Mongo DB ---------------------------------------

app.use(session({
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://carrizoja:Sietepalabras155@codercluster18335.gtx5o.mongodb.net/mySessionsDatabase?retryWrites=true&w=majority',
        ttl: 30
    }),
    secret: 'mongosecretcoderfeliz2022',
    resave: false,
    saveUninitialized: false,

}))

// -------------------------- Passport ---------------------------------------
// Passport Inizialization
app.use(passport.initialize());
// Link session with passport
app.use(passport.session());
// Passport serialization
passport.serializeUser((user, done) => {
    return done(null, user.id);
});
// Passport deserialization
passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    })
    // create Hash
const createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    // Passport Strategy for sign up
passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, done) => {
        User.findOne({ email: req.body.email }, (err, user) => {

            if (err) {
                return done(err);

            }
            if (user) {
                return done(null, false, { message: 'User already exists' });
            }
            const newUser = {
                email: req.body.email,
                username: username,
                password: createHash(password),
            }
            User.create(newUser, (err, userCreated) => {
                if (err) return done(err);
                return done(null, userCreated);
            });
        })
    }
));
// Local Strategy for login
passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, done) => {
        User.findOne({ email: username }, (err, userFound) => {
            if (err) {
                return done(err);

            }
            //validate if user exists
            if (!userFound) {
                return done(null, false, { message: 'User not found' });
            }
            //validate if password is correct
            if (!bcrypt.compareSync(password, userFound.password)) {
                return done(null, false, { message: 'Wrong password' });
            }
            //Open session with user found
            req.session.isAuth = true;
            req.session.username = username;
            return done(null, userFound);
        })
    }
));


const isAuth = (req, res, next) => {
    if (req.session.isAuth) {

        next();
    } else {
        res.redirect('/unauthorized');

    }
}

// ---------------------------------------------------------------------------------------

// ----------------------------- Routes -------------------------------------------------

app.get('/', (req, res) => {

    res.sendFile(path.join(publicPath, '/index.html'));

})

app.get('/register', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/profile');
    res.sendFile(path.join(publicPath, '/pages/register.html'));
})

app.get('/profile', isAuth, (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/profile.html'));
})


app.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/login.html'))
})

app.get('/unauthorized', (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/unauthorized.html'));
})

app.get('/profNameDisabled', (req, res) => {
    console.log(req.user);
    if (req.user) res.send(req.user);
})

app.post('/login', passport.authenticate('login', {
    failureRedirect: '/userPassIncorrect',
}), (req, res) => {

    res.redirect('/profile');


})

app.post('/register', passport.authenticate('local-signup', {
    failureRedirect: '/userExists',

}), (req, res) => {
    res.redirect('/login');

})

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            throw err;
        }
        res.redirect('/logout');
    });
})

app.get('/logout', (req, res) => {
    // function to setTimeOut to redirect to home page after 4 seconds  after logout
    res.sendFile(path.join(publicPath, '/pages/logout.html'));

});

app.get('/userPassIncorrect', (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/userPassIncorrect.html'));
})

app.get('/userExists', (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/userExists.html'));
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