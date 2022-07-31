const yargs = require('yargs/yargs')(process.argv.slice(2))
const { ObjectTools } = require('../utils/tools');
require('dotenv').config();

let args = yargs
    .default({
        "MODE": "FORK",
        "PORT": 8080,
        "STORAGE": "MongoDB",
    })
    .alias({
        m: "MODE",
        p: "PORT",
        s: "STORAGE"
    })
    .argv;
args = ObjectTools.removeAllPropertiesExcept(args, ["MODE", "PORT", "STORAGE"]);

const config = {
    dev: process.env.NODE_ENV !== 'production',
    SELECTED_STORAGE: args.STORAGE,
    SESSION_SECRET: process.env.SESSION_SECRET || "NO SUPER SECRET",
    USE_GRAPHIQL: process.env.USE_GRAPHIQL || false
}

const DB = {
    mariaDB: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "ecommerceD11",
        },
        pool: {
            min: 0,
            max: 7
        },
        useNullAsDefault: true
    },
    mongoDB: {
        uri: `mongodb://${process.env.MONGO_DB_HOST || "localhost"}:${process.env.MONGO_DB_PORT || "27017"}/${process.env.MONGO_DB_NAME || "ecommerceD11"}`,
        atlas_uri: `${process.env.MONGO_ATLAS}` || ""
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./data/db/${process.env.DB_NAME || "ecommerceD11"}.sqlite`
        },
        pool: {
            min: 0,
            max: 7
        },
        useNullAsDefault: true
    }
}

module.exports = { args, config, DB };