const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/User.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

app.listen(8080,()=>{
    console.log("listening on port 8080")
})

//archivos estaticos
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

//configuracion de req.body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const URL = "mongodb+srv://fredy:coder18335@cluster18335.nk0og.mongodb.net/passportDatabase?retryWrites=true&w=majority";

mongoose.connect(URL, {
    useNewUrlParser: true, useUnifiedTopology: true
},err=>{
    if(err) throw new Error("No se pudo conectar");
    console.log("db conectada")
})

//crear session
app.use(session({
    secret:"clave",
    resave: true,
    saveUninitialized: true
}))

//configurar passport para autenticacion
//incializar passport
app.use(passport.initialize());
//vincular esa session con passport
app.use(passport.session());

//serializacion
//{id:1, name:"fredy", username:"fredy10",.....} ->{id:1}

passport.serializeUser((user,done)=>{
    return done(null, user.id)
})

//deserializacion {id:1} -> {_id:1, name:"fredy", username:"fredy10",.....}
passport.deserializeUser((id, done)=>{
    User.findById(id,(err,user)=>{
        return done(err,user)
    })
})

//estrategia con passport del registro
passport.use('registro', new LocalStrategy(
    {
        passReqToCallback: true
    },
    (req,username,password,done)=>{
        User.findOne({username:username},(err,user)=>{
            if(err) return done(err)
            if(user) return done(null, false, {message:"user already exists"});
            const newUser = {
                name: req.body.name,
                username: username,
                password: password
            }
            User.create(newUser, (err,userCreated)=>{
                if(err) return done(err);
                return done(null,userCreated)
            })
        })
    }
))

//routes
app.get('/',(req,res)=>{
    res.sendFile(publicPath+'/index.html')
})

app.get('/signup',(req,res)=>{
    res.sendFile(publicPath+'/signup.html')
})

app.get('/login',(req,res)=>{
    res.sendFile(publicPath+'/login.html')
})

app.get('/perfil',(req,res)=>{
    res.sendFile(publicPath+'/perfil.html')
})

app.post("/signupForm",passport.authenticate('registro',{
    failureRedirect: '/signup',
}) ,(req,res)=>{
    res.redirect("/perfil");
    // console.log(req.body)
})