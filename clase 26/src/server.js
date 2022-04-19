const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.listen(8080, () => {
    console.log('Listening on port 8080');
})

// Statics files

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));


//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //reads embebed data inside a json

const URL = 'mongodb+srv://carrizoja:Sietepalabras155@codercluster18335.gtx5o.mongodb.net/passportDatabase?retryWrites=true&w=majority';

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
        if (err) throw new Error('Error connecting to database');
        console.log('Connected to database');
    });

// Create a session
app.use(session({
        secret: 'mongosecretcoderfeliz2022',
        resave: true,
        saveUninitialized: true,
    }

))

// configure passport for authentication
// inizialize passport
app.use(passport.initialize());
// vinculate passport with session
app.use(passport.session());

// serialization
// {id:1,name:'juan', username:'juan',...} -> {id:1}
passport.serializeUser((user, done) => {
    return done(null, user.id);

})

// deserialization
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        return done(err, user);
    })
})


// encrypt passwords
const createHash = (password) => {
    return bcrypt.hashSync(
        password, bcrypt.genSaltSync(10)
    );

}

// Passport Strategy signup
passport.use('local-signup', new LocalStrategy({

        passReqToCallback: true
    },
    (req, username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return done(err);
            if (user) return done(null, false, { message: 'The username is already in use' });
            const newUser = {
                name: req.body.name,
                username: username,
                password: createHash(password),
            }
            User.create(newUser, (err, userCreated) => {
                if (err) return done(err);
                return done(null, userCreated);
            })
        })
    }
))


// routes 
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, '/index.html'));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, '/login.html'));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(publicPath, '/signup.html'));
})

app.get('/perfil', (req, res) => {
        res.sendFile(path.join(publicPath, '/perfil.html'));
    })
    /* app.get() */


app.post('/signupForm', passport.authenticate('local-signup', {
    failureRedirect: '/signup'
}), (req, res) => {
    res.redirect("/perfil");

})