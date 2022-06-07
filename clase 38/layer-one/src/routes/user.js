const express = require('express');

const router = express.Router();
const { userAll } = require('../services/user.services');
router.get('/', (req, res) => {
    let users = userAll();
    res.send({ data: users });
})

module.exports = router;