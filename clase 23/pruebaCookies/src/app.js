import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.use(express.json());
app.use(cookieParser("ab0z3Ar4M0"));

app.get('/setCookie', (req, res) => {
    /* res.cookie('pepitos', "abc").send('Cookie created'); */
    res.cookie("session", { username: "Dau", role: "user" }).send('Cookie created');
})
app.get('/getCookie', (req, res) => {
    let cookies = req.cookies;
    res.send(cookies);
})

app.get('/setCookieWithExpires', (req, res) => {
    res.cookie('ritz', { a: 1, b: 2 }, {
        httpOnly: true, // Xss
        maxAge: 10000
    }).send('Cookie with expires set');
})

app.get('/clearCookie', (req, res) => {
    res.clearCookie('pepitos').send('Cookie cleared');
})

app.get('/setSignedCookie', (req, res) => {
    res.cookie('session', { username: 'Dau', role: 'user' }, { signed: true })

    .send('Cookie created');
})

app.get('/getSignedCookie', (req, res) => {
    res.send(req.signedCookies);
})