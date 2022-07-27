class ChatDto {
    constructor(data) {
        this.username = data.username;
        this.id = data.id || null;
        this.message = data.message;
        this.timestamp = data.timestamp || null;
    }
}

module.exports = ChatDto;