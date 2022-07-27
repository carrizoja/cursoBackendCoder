const MongoDBContainer = require('../../containers/MongoDBContainer.js');
const Chat = require('../../schemas/nosql/chat.js');

class ChatsDaoMongoDB {
    chatManager = new MongoDBContainer(Chat);

    async getAll() {
        return await this.chatManager.getAll();
    }

    async save(chat) {
        return await this.chatManager.save(chat);
    }


}

module.exports = ChatsDaoMongoDB;