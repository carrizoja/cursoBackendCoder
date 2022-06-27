const MemoryDao = require('./dao/memory.dao');
const MongoDao = require('./dao/mongo.dao');

let persistence = "memory";
let userDao;

switch (persistence) {
    case "memory":
        userDao = new MemoryDao();
        break;
    case "mongo":
        userDao = new MongoDao();
        break;

}

module.exports = { userDao }