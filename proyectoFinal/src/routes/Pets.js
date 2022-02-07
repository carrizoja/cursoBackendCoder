const express = require('express');
const router = express.Router();
const PetManager = require('../Managers/Pets');
const uploader = require('../services/Upload');

const petService = new PetManager();
router.get('/', (req, res) => {
    petService.get().then(result => res.send(result))
})

router.post('/', uploader.single('file'), (req, res) => {
    let pet = req.body;
    let file = req.file;
    if (!file) return res.status(500).send({ error: "Couldn't upload file" })
    pet.thumbnail = req.protocol + "://" + req.hostname + ":8080/img/" + file.filename;
    petService.add(pet).then(result => res.send(result));
})

module.exports = router;