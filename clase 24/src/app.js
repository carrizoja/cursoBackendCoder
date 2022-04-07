import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import fileStrategy from 'session-file-store'

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
const FileStorage = fileStrategy(session);


app.use(cookieParser());
app.use(session({
    // Va false porque ya hay un sistema de persistencia en el cual nosotros nos encargamos de guardar la sesión
    store: new FileStorage({ path: './src/sessions', ttl: 3600, retries: 0 }),
    secret: 'as654hkf4098',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 20000
    }
}))

app.get('/', (req, res) => {
    req.session.cualquierCosa = 2,
        res.send('Hola, su sesión ha iniciado')
})