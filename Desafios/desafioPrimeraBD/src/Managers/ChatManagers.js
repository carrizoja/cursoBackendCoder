const options = require('../options/mysqlLite3config.js')
const knex = require('knex');
const database = knex(options);

class ChatManager {


    add = async(product) => {
        let tableExists = await database.schema.hasTable('chats');
        if (tableExists) {
            await database('chats').insert(product);
            return { status: "success", message: "Product added" }
        }

    }

}

module.exports = ChatManager;