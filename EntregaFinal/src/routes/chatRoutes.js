const express = require('express');

const controller = require('../controllers/chat.controller');

const chatRouter = express.Router();

chatRouter.get('/', controller.getChats);
/* chatRouter.get('/:username', controller.getChatsByUsername); */


module.exports = chatRouter;