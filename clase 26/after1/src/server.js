const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo');

const app = express();
app.listen(8080, () => {
    console.log('Listening on port 8080');
})

// Activate cookies 
app.use(cookieParser());

//Create session
app.use(session({
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://carrizoja:Sietepalabras155@codercluster18335.gtx5o.mongodb.net/MySessions?retryWrites=true&w=majority',
        ttl: 30 // in seconds. Its restarts when a user send a request. If the server is down, the session wont be lost.
    }),
    secret: 'secretKey',
    resave: false, // save session even if not modified
    saveUninitialized: false, // save session even if not modified
    // cookie: {
    //   secure: false, // set to true if using https
    // maxAge: 30000 // Time active cookie in miliseconds
    // }
}));

// routes 
app.post('/login', (req, res) => {
    // validate data user and password in database
    req.session.user = { username: "pepe" }
    res.send('login correct')
})

app.post('/profile', (req, res) => {
    if (req.session.user) {
        res.json(req.session)
    } else {
        res.status(403).send("unauthorized")
    }
})

app.post('/logout', (req, res) => {

    res.send('logout correct')
})