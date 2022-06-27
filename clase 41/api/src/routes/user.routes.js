const express = require('express');
const { getAllUsers, getUserById, createUser } = require('../controllers/user.controller');
const { Router } = express;

const router = new Router();

router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.post('/users', createUser)

module.exports = router;