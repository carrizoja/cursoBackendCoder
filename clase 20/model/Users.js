const mongoose = require('mongoose');

const collection = 'users';
const schema = new mongoose.Schema({

})

const userService = mongoose.model(collection, schema);

module.exports = userService;