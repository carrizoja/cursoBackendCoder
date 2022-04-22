const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoStore = require("connect-mongo");

const app = express();
app.listen(8080, ()=>{
    console.log('listening on port 8080')
})

//activamos las cookies en nuestro proyecto
app.use(cookieParser());

//crear la session
app.use(session({
    store: mongoStore.create({
        mongoUrl:"mongodb+srv://fredy:coder18335@cluster18335.nk0og.mongodb.net/mySessions?retryWrites=true&w=majority",
        ttl:30 //
    }),
    secret:"claveSecreta",
    resave: false,
    saveUninitialized: false,
    // cookie:{
    //     secure: false, // if true allows cookies for https
    //     maxAge: 30000 //tiempo de la cookie activa
    // }
}))

//routes
app.post("/login",(req,res)=>{
    //validar que los datos de username y password sean correctos en la base de datos

    //una vez que valida procede a abrir sesion
    req.session.user = {username:"pepe"}
    res.send("inicio sesion correctamente")
})

//ruta protegida
app.post('/profile', (req,res)=>{
    if(req.session.user){
        res.json(req.session)
    } else{
        res.status(403).send("unauthorized")
    }
})

app.post("/logout",(req,res)=>{
    res.send("sesion cerrada")
})

