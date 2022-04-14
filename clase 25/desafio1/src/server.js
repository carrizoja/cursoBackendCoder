import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(
    import.meta.url));

const app = express();

app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// session config
app.use(session({
    // session sign
    secret: 'ultrasecret',
    resave: true,
    saveUninitialized: true,

}));


// handlebars config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/sigup', (req, res) => {
    res.render('sigup');
})

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/perfil', (req, res) => {
            let user = req.session.user;
            if (user) {

            })


        let users = [];

        app.post('/login', (req, res) => {
            const { username } = req.body;
            const userFound = users.find(user => user.username === username);
            if (userFound) {
                console.log('User exists');
            } else {
                users.push(req.body);
                res.redirect('/perfil')
            }

        });


        app.post('/login', (req, res) => {
            const { username, password } = req.body;
            const user = users.find(user => user.username === username)
            if (user) {
                if (user.password === password) {
                    res.redirect('/perfil')
                } else {
                    res.redirect('invalid password')
                }
            } else {
                console.log('User not found')
            }
        })

        app.get('/logout', (req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            });
            res.redirect('/');
        })