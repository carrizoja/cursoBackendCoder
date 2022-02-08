const express = require('express');
const app = express();
const server = app.listen(8080, () => {
    console.log("listening on port 8080");
})

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/', (req, res) => {
    res.render('users', {

    })
})