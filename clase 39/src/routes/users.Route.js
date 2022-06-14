const express = require('express')
const { getDataController, postDataController } = require('../controllers/users.Controller')

const router = express.Router()

router.get('/', getDataController)
router.post('/', postDataController)

module.exports = router