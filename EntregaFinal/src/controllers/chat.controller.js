const chatService = require('../services/chat.service.js');

const getChats = async(req, res) => {
    try {
        const response = await chatService.getAll();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

const getChatsByUsername = async(req, res) => {
    try {
        const response = await chatService.getChatsByUsername(req.params.username);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getChats,
    getChatsByUsername
}