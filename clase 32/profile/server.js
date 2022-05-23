const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = parseInt(process.argv[2]) || 8080;
const users = {};


app.get("/", (req, res) => {
    res.json({ users });
})

// create user
app.get('/newUser', (req, res) => {
    let userName = req.query.userName || "";
    let password = req.query.password || "";

    // Regular Expression to eliminate special characters
    userName = userName.replace(/[!@#$%^&*]/g, "");

    if (!userName || !password || users[userName]) {
        return res.sendStatus(400);
    }

    //Password encryption
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

    users[userName] = { salt, hash };
    res.sendStatus(200);

})



// login block function
app.get("/auth-bloq", (req, res) => {
    let userName = req.query.userName || "";
    let password = req.query.password || "";

    username = userName.replace(/[!@#$%^&*]/g, "");

    if (!username || !password || !users[username]) {
        process.exit(1);
    }

    const [salt, hash] = users[username];
    const encrypHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
    if (crypto.timingSafeEqual(hash, encrypHash)) {
        res.sendStatus(200);
    } else {
        process.exit(1);
    }

})


// login Not block
app.get("/auth-bloq", (req, res) => {
    let userName = req.query.userName || "";
    let password = req.query.password || "";

    username = userName.replace(/[!@#$%^&*]/g, "");

    if (!username || !password || !users[username]) {
        process.exit(1);
    }

    const { salt } = users[username];

    crypto.pbkdf2(password, salt, 10000, 512, 'sha512', (err, hash) => {
        if (users[username].hash.toString() === hash.toString('base64')) {
            res.sendStatus(200);
        } else {
            process.exit(1);
        }
    });


})




app.listen(PORT, () => {
    console.log('Server running on port', PORT);
})