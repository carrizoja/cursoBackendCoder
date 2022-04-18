import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://carrizoja:Sietepalabras155@codercluster18335.gtx5o.mongodb.net/mySessionsDatabase?retryWrites=true&w=majority',
        ttl: 200
    }),
    secret: 'mongosecretcoderfeliz2022',
    resave: false,
    saveUninitialized: false,
}))


app.get('/', (req, res) => {
    req.session.cualquierCosa = { a: 3, c: 1 }
    res.send('Hola, su sesión ha iniciado')
})