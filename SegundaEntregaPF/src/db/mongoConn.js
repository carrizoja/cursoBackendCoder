const mongoose = require('mongoose');

const databsetouse = 'mongo';

let db;
async function connectWithMongo() {
    try {
        mongoose.connect(
            'mongodb+srv://carrizoja:Sietepalabras155@codercluster18335.gtx5o.mongodb.net/ecommerce?retryWrites=true&w=majority', {
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