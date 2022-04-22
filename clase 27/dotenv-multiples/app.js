const express = require("express");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config({
    path: ".env.production"
});

const environment = process.env.NODE_ENV == "development" ? ".env.development" : ".env.production";

console.log(process.env.URL_DB);
const URL = process.env.URL_DB;

const app = express();
app.listen(8080, () => console.log("listening on port 8080"));

app.get("/datos", (req, res) => {
    fetch(URL)
        .then(res => res.json())
        .then(data => res.send(data));
})