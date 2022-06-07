const express = require('express');
const { fork } = require('child_process');
const router = express.Router();


/* A route that resolves a random Math operation */
router.get("/api/randoms", (req, res) => {
    let numbers = 100000000;
    let myFnx = fork("../src/other/index.js");
    if (req.query.cant) {
        numbers = Number(req.query.cant);
    }
    myFnx.send(numbers);
    myFnx.on("message", (total) => {
        res.send(total);
    });
});




module.exports = router;