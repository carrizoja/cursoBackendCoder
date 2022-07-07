const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    avatar: {
        type: String
    },
    admin: {
        type: Boolean,
    }
});

module.exports = mongoose.model('User', userSchema);