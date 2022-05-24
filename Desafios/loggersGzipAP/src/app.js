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
const bcrypt = require('bcryptjs');
const connectWithMongo = require('./config/db');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const passport = require('passport');
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const processRouter = require('./routes/processRoutes');
const forkRouter = require('./routes/forkRoutes');
const fakerRouter = require('./routes/fakerRoutes');

const { args } = require('./config');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const httpServer = new HttpServer(app);
const { errorLog: errorLogger, infoLog: infoLogger } = require('./utils/loggers/winston');
const serverMw = require('./utils/middlewares/ServerMw');


// ------------------------- Start Gzip ------------------------------------------------

let responseTime = require('response-time');
app.use(responseTime());

const gzip = require('compression');
const { info } = require('console');
app.use(gzip({
    // filter decides if the response should be compressed or not, 
    // based on the `shouldCompress` function above
    //filter: shouldCompress,

    // threshold is the byte threshold for the response body size
    // before compression is considered, the default is 1kb
    threshold: 0
}));

//------------------------------ End Gzip ------------------------------------------------

connectWithMongo.connectWithMongo();
const io = new IOServer(httpServer);
app.use(express.json());
const publicPath = path.join(__dirname, 'public');

/* -----------------------------------Routes -------------------------------------- */
app.use('/', express.static(publicPath));
app.use('/fork', forkRouter);
app.use('/process', processRouter);
app.use('/faker', fakerRouter);

// ------------------------------------ End Routes -----------------------------------


// req.body config
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// -------------------------- Sesion in Mongo DB ---------------------------------------

app.use(session({
        store: mongoStore.create({
            mongoUrl: process.env.MONGOSESSIONURL,
            ttl: 30
        }),
        secret: 'mongosecretcoderfeliz2022',
        resave: false,
        saveUninitialized: false,

    }))
    //-------------------------------- End Session in Mongo DB ---------------------------------------
    // -------------------------- Passport ---------------------------------------------------------
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

// --------------------------------- End Passports ---------------------------------------

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {

        next();
    } else {
        res.redirect('/unauthorized');

    }
}

// ---------------------------------------------------------------------------------------



// ----------------------------- Endpoints -------------------------------------------------


app.get('/', (req, res) => {

    res.sendFile(path.join(publicPath, '/index.html'));

})

app.get('/register', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/profile');
    res.sendFile(path.join(publicPath, '/pages/register.html'));
    infoLogger.info(`User visited the register page --> path: ${req.path} || method: ${req.method}`);
})

app.get('/profile', isAuth, (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/profile.html'));
    infoLogger.info(`User visited the profile page --> path: ${req.path} || method: ${req.method}`);
})


app.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/login.html'));
    infoLogger.info(`User visited the login page --> path: ${req.path} || method: ${req.method}`);
})

app.get('/unauthorized', (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/unauthorized.html'));
    infoLogger.info(`User went to unauthorized page --> path: ${req.path} || method: ${req.method}`);
})

app.get('/profNameDisabled', (req, res) => {
    console.log(req.user);
    if (req.user) res.send(req.user);
    infoLogger.info(`Fetch to obtain user data --> path: ${req.path} || method: ${req.method}`);
})

app.post('/login', passport.authenticate('login', {
    failureRedirect: '/userPassIncorrect',
}), (req, res) => {

    res.redirect('/profile');
    infoLogger.info(`User logged in with email: ${req.body.email} --> path: ${req.path} || method: ${req.method}`);


})

app.post('/register', passport.authenticate('local-signup', {
    failureRedirect: '/userExists',

}), (req, res) => {
    res.redirect('/login');
    infoLogger.info(`User registered --> path: ${req.path} || method: ${req.method}`);

})

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            throw err;
        }
        res.redirect('/logout');
        infoLogger.info(`User logged out --> path: ${req.path} || method: ${req.method}`);
    });
})

app.get('/logout', (req, res) => {
    // function to setTimeOut to redirect to home page after 4 seconds  after logout
    res.sendFile(path.join(publicPath, '/pages/logout.html'));
    infoLogger.info(`User logged out --> path: ${req.path} || method: ${req.method}`);
});

app.get('/userPassIncorrect', (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/userPassIncorrect.html'));
    infoLogger.info(`User entered wrong password --> path: ${req.path} || method: ${req.method}`);
})

app.get('/userExists', (req, res) => {
    res.sendFile(path.join(publicPath, '/pages/userExists.html'));
    infoLogger.info(`User already exists --> path: ${req.path} || method: ${req.method}`);
})

app.use(serverMw.routeNotImplemented);

/* app.all('*', (req, res, next ) => {
    infoLogger.info(`Petición recibida -> ruta: '${req.path}' || método: '${req.method}'`)
        next();
}); */


// ----------------------------------End Endpoints ------------------------------------------------------
// ---------------------------------- Start Sockets -----------------------------------------------------
// Socket ya toma automáticamente json. No es necesario aclarar con app.use(express.JSON());
// Services

const chatService = new ChatManager();
io.on('connection', async socket => {
    console.log("Cliente conectado");
    try {
        let products = await productService.getAll();
        io.emit('productLog', products)
        socket.on('sendProduct', async data => { // Por cada emit del lado del index.js hago un socket.on
            await productService.add(data);
            let products = await productService.getAll();
            io.emit('productLog', products)
        })
    } catch {
        errorLogger.error(`API Products --> error: ${error.message}`);
    }

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
        try {
            await chatService.add(chat);
            let messages = await chatService.add();
            io.emit('messageLog', messages)
        } catch {
            errorLogger.error(`API Chat --> error: ${error.message}`);
        }
        try {
            let users = await chatService.get();
            let user = users.payload.find(u => u.author.nickname === data.nickname)
            io.emit('userLog', user.author.nickname)
        } catch {
            errorLogger.error(`API Chat --> error: ${error.message}`);
        }

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

// ----------------------------------- Cluster Scalability --------------------------------------------

if (args.MODE === "CLUSTER" && cluster.isMaster) {
    console.log(`Master PID number ${process.pid} is running`);

    // Workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker number ${worker.process.pid} died`);
        cluster.fork();
    })
} else {
    const server = httpServer.listen(args.PORT, () => {
        console.log(`Server on http://localhost:${args.PORT} || Worker: ${process.pid} || Date: ${new Date()}`);
    })

    server.on("error", error => console.log(error));
}