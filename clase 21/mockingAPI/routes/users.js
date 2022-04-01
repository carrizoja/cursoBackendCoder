import express from "express";
import UsersMock from '../mocks/usersMocks.js';

const router = express.Router();
const usersMock = new UsersMock();


router.post('/popular', (req, res) => {
    usersMock.popular(100);
})

router.get('/', (req, res) => {
    res.send(usersMock.listarAll());
})

export default router;