const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.listen(8080, () => {
    console.log("listening on port 8080")
})

app.post('/login', () => {
    const userLogin = {
            username: "pepe",
            password: "1234"
        }
        // validate that user exists in database

    //if exists, create a token
    jwt.sign({ user: userLogin }, "claveDeCodificacion", (err, token) => {
        if (err) return res.send("error generating token")
        res.json({ token: token })
    })

})



// middleware to validate correct token
const isvaliudToken = (req, res, next) => {
    console.log(req.headers)
    const headerToken = req.headers.authorization;
    if (typeof(headerToken) !== "undefined") {
        // bearer token format
        const tokenArray = headerToken.split(" ");
        const token = tokenArray[1];
        console.log(token)
        jwt.verify(token, "claveDeCodificacion", (err, tokenDecoded) => {
            if (err) return res.send("invalid token")
            res.json(tokenDecoded)
        })
        next()
    } else {
        res.send("no token")
    }

}

app.post("/datos-perfil", isvaliudToken, (req, res) => {
    res.send("Profile data")
})

app.post('/modify-profile', isvaliudToken, (req, res) => {
    res.send("modified profile")
})