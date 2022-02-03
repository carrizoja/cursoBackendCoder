const express = require('express');

const app = express();

const server = app.listen(8080, () => {
    console.log("Listening on port 8080");
})

const sentence = "Frase inicial";

app.use(express.json());