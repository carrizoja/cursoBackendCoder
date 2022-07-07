const { config } = require('../../config');

// Posibles STORAGE are -> Firebase ; FS ; MariaDB ; Memory ; MongoDB ; SQLite3
const ChatDao = require(`./chat/ChatDao${config.SELECTED_STORAGE}`);
const ProductsDao = require(`./products/ProductsDao${config.SELECTED_STORAGE}`);

// Factory pattern: Create and return a set of Daos 
// Singleton pattern: Unique instance of the class
class DAOsFactory {
    static singleton;

    constructor() {
        if (DAOsFactory.singleton) {
            return DAOsFactory.singleton;
        }

        DAOsFactory.singleton = {
            chatDao: new ChatDao(),
            productsDao: new ProductsDao()
        };

        this.singleton = DAOsFactory.singleton;
    }
}

module.exports = new DAOsFactory().singleton;