import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import {dirname} from "path";
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))

const app =express();

app.use(express.static(__dirname+'/public'))

const PORT = process.env.PORT||8080;

//configura nuestra session
app.use(session({
    //firmar session
    secret: "ultrasecreto",
    resave:true,
    saveUninitialized: true,
}))

app.listen(PORT, ()=>{
    console.log(`running on PORT ${PORT}`)
})

//incializar el motor de plantillas
app.engine('handlebars', handlebars.engine());
//configurar ubicacion de las vistas y la extension
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

//permite leer en formato json de la peticion
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/signup', (req,res)=>{
    res.render('signup')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/perfil',(req,res)=>{
    let user = req.session.user;
    console.log(req.session);
    if(user) return res.render('perfil')
    res.redirect('/login')
})

let users = [];

app.post('/signup',(req,res)=>{
    const {username} = req.body;
    const userFound = users.find(el=>el.username === username);
    if(userFound){
        console.log("el usuario ya existe")
    } else{
        users.push(req.body);
        req.session.user = req.body;
        res.redirect('/perfil')
    }
})

app.post('/login',(req,res)=>{
    const {username, password} = req.body;
    const user = users.find(el=>el.username === username);
    if(user){
        if(user.password === password){
            console.log('usuario validado')
            req.session.user=req.body;
            res.redirect('/perfil')
        } else{
            console.log('contrasena invalida')
        }
    } else{
        console.log('el usuario no esta registrado')
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err) return res.send({messageError:err})
        res.redirect('/')
    })
})