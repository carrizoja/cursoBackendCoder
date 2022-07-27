const FSContainer = require('../../containers/FSContainer');
const ChatDto = require('../../dtos/ChatDto');
const path = require('path')
const chatsPath = path.join('files', 'chats.json')

class ChatDaoFS extends FSContainer {
    constructor() {

        super(chatsPath);
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);
            return new ChatDto(result);
        } catch (error) {
            console.log("Error getById() on CartsDaoFS", error);
        }
    }

    async getAll() {
        try {
            const results = await super.getAll();

            const dtos = results.map(result => {
                return new ChatDto(result);
            });

            return dtos;
        } catch (error) {
            console.log("Error getAll() on CartsDaoFS", error);
        }
    }

    async disconnect() {

    }



}

module.exports = ChatDaoFS;