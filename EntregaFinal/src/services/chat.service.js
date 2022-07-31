const { chatDao } = require('../models/daos');


class Chat {
    constructor() {
        this.storage = chatDao;
    }

    async getAll() {
        try {
            return await this.storage.getAll();
        } catch (error) {
            console.log(error);
        }
    }


    async getChatsByUsername(username) {
        try {
            return await this.storage.getChatsByUsername(username);
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = new Chat();