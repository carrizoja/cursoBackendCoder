const express = require('express');
const app = express();



app.use(express.static('public'));
app.get("/", (req, res) => {
    res.sendFile("index.html");
})

const PORT = process.argv[2] || 8080;

app.get("/datos", (req, res) => {
    res.send(`<h1>I am the server express running with data in the process ${process.pid} </h1>`);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in process ${process.pid}`);
})