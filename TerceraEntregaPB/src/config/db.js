// MongoDb
require('dotenv').config();
const { mongoose } = require('mongoose');

let db;
/**
 * It connects to the mongoDB database and returns a promise.
 */
async function connectWithMongo() {
    try {
        mongoose.connect(
            process.env.MONGOURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.log('connected to mongoDB');
        });
    } catch (error) {
        console.log('cannot establish connection with mongo');
    }
}

module.exports = {
    db,
    connectWithMongo,
};