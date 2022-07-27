const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatsSchema = new Schema({
    username: String,
    message: String,
    id: Number,
    timestamp: Date
});

const Chat = mongoose.model('Chat', ChatsSchema);

module.exports = Chat;