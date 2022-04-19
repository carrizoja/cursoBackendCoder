/* const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async() => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.log("Something went wrong with Database connection");
        process.exit(1);
    }
};

module.exports = connectDB; */


const mongoose = require('mongoose');

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