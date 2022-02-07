const express = require('express');
const usersRouter = require('./routers/user');
const petsRouter = require('./routers/pets');
const app = express();

const port = 8080;

const server = app.listen(port, () => {
    console.log(`Listening on port 8080`);
})
app.use(express.json());
app.use('/user', usersRouter);
app.use('/pets', petsRouter);
app.use(express.static('public'));