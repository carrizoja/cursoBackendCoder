const mongoose = require('mongoose');
const Config = require('../config/config');

class MyMongoClient {
    constructor(url) {
        (this.conected = false), (this.client = mongoose);
    }

    async connect() {
        try {
            await this.client.connect(Config.host + Config.name)
        } catch (error) {
            throw "Error trying to connect to database";
        }

    }

    async disconnect() {
        try {
            await this.client.close();
            console.log("Disconnected");
        } catch (error) {
            throw "Error trying to disconnect to database";
        }

    }
}

module.exports = MyMongoClient;