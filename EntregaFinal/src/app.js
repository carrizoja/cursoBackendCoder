const express = require('express');
const connectWithMongo = require('./config/mongoDB');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { productsDao, chatDao, cartDao } = require('./models/daos')
const { args } = require('./config');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const httpServer = new HttpServer(app);
const { errorLog: errorLogger, infoLog: infoLogger, warnLog: warnLog } = require('./utils/loggers/winston');
const serverMw = require('./utils/middlewares/ServerMw');
const store = require('store2');

const { NormalizeTools } = require("./utils/tools/NormalizeTools.js");
const { chatSchema } = require("./models/schemas/normalize/chat");

// ------------------------- Start Gzip ------------------------------------------------

let responseTime = require('response-time');
app.use(responseTime());

const gzip = require('compression');
app.use(gzip({

    threshold: 0
}));

//------------------------------ End Gzip ------------------------------------------------

connectWithMongo.connectWithMongo();
const io = new IOServer(httpServer);
const publicPath = path.join(__dirname, 'public');

// -------------------------- Sesion in Mongo DB ---------------------------------------
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo');
app.use(cookieParser());
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
const { passport } = require('./utils/passport/passport.js');
app.use(passport.initialize());
app.use(passport.session());

// --------------------------------- End Passports ---------------------------------------

/* -----------------------------------Routes -------------------------------------- */
const processRouter = require('./routes/processRoutes');
const forkRouter = require('./routes/forkRoutes');
const fakerRouter = require('./routes/fakerRoutes');
const productRouter = require('./routes/productRoutes');
const generalRouter = require('./routes/generalRoutes');
const cartRouter = require('./routes/cartRoutes');
const chatRouter = require('./routes/chatRoutes');

app.use('/', generalRouter);
app.use('/', express.static(publicPath));
app.use('/fork', forkRouter);
app.use('/process', processRouter);
app.use('/faker', fakerRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chats', chatRouter);


// ------------------------------------ End Routes -----------------------------------

// ----------------------------- Endpoints -------------------------------------------------

app.post('/purchase', async(req, res) => {
    let purchase;
    let userData;
    io.on('connection', (socket) => {
        socket.on('purchase', (data) => {
            console.log(data);
            purchase = data;
        })
        socket.on('userData', (data) => {
            console.log(data);
            userData = data;
        })
    })

    res.sendFile(path.join(publicPath, '/pages/purchase.html'));

})

app.use(serverMw.routeNotImplemented);
// ----------------------------------End Endpoints ------------------------------------------------------
// ---------------------------------- Start Sockets -----------------------------------------------------


io.on('connection', async socket => {
    console.log("Cliente conectado");
    try {
        let data = await productsDao.getAll();
        let products = JSON.parse(JSON.stringify(data))
        io.emit('productLog', products)
        socket.on('sendProduct', async data => { // Por cada emit del lado del index.js hago un socket.on
            await productsDao.save(data);
            let products = await productsDao.getAll();
            io.emit('productLog', products)
        })
    } catch (error) {
        errorLogger.error(`API Products --> error: ${error.message}`);
    }

})

let log = [];

io.on('connection', (socket) => {
    socket.broadcast.emit('newUser')
    socket.on('message', async data => {
        log.push(data);
        io.emit('log', log);
        await chatDao.save(data);
        let chats = await chatDao.getAll(data);
        const normalizedData = NormalizeTools.getNormalizeData(chats, chatSchema, "messages");
        io.emit('normalizedData', normalizedData);
    })

    socket.on('registered', async data => {

        socket.emit('log', log);

    })
});

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
    const server = httpServer.listen(process.env.PORT || args.PORT, () => {
        console.log(`Server on http://localhost:${args.PORT} || Worker: ${process.pid} || Date: ${new Date()}`);
    })

    server.on("error", error => console.log(error));
}