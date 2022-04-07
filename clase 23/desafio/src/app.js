import express from 'express';
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
// allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
app.use(express.urlencoded({ extended: true }));

//Middleware de Express
app.use(session({
    secret: 'ab0z3Ar4M0',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3000
    }
}))

app.get('/login', (req, res) => {
    if (req.session.username) return res.send('Ya estas registrado');
    let { nombre } = req.query;
    req.session.username = nombre;
    res.send(`Bienvenido ${nombre}`);
})
app.get('/current', (req, res) => {
    let user = req.session.username;
    if (req.session.contador) {
        req.session.contador++;
    } else {
        req.session.contador = 1;
    }
    res.send(`El usuario ${user} ha visitado el sitio ${req.session.contador} veces`);
})

app.get('logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) return res.send('Logout');
        res.send({ status: "error", message: err });
    });
    res.send('Has cerrado sesion');
})