const { schema } = require("normalizr");

const authorsSchema = new schema.Entity('authors');

const messagesSchema = new schema.Entity('messages', {
    author: authorsSchema
});

const chatSchema = new schema.Entity('chatSchema', {
    messages: [messagesSchema]
})

module.exports = { chatSchema };