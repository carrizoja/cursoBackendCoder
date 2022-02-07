const express = require('express');

const router = express.Router();
let pets = [];
router.get('/', (req, res) => {
    res.send("Hola desde router Users")
})

router.get('/:id');

router.post('/', (req, res) => {
    let pet = req.body;
    pets.push(pet);
    res.send({ message: "Pet created" });
})


module.exports = router;