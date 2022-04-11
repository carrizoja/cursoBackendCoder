const fs = require('fs');

const pathToChats = __dirname + '/../files/chats';

class ChatManager {

    add = async(chat) => {
        if (fs.existsSync(pathToChats)) {
            try {
                let data = await fs.promises.readFile(pathToChats, 'utf-8');
                let chats = JSON.parse(data);
                if (chats.length == 0) {
                    // Is the first chats
                    chat.id = 1;
                    chats.push(chat);
                    await fs.promises.writeFile(pathToChats, JSON.stringify(chats, null, 2))
                    return { status: "success", message: "Added 1 chat" }
                }
                chat.id = chats[chats.length - 1].id + 1;
                chats.push(chat);
                await fs.promises.writeFile(pathToChats, JSON.stringify(chats, null, 2));
                return { status: "success", message: "Added 1 chat" };
            } catch (error) {
                return { status: "error", error: error }
            }


        } else {
            try {
                chat.id = 1;
                await fs.promises.writeFile(pathToChats, JSON.stringify([chat], null, 2));
                return { status: "success", message: "Added 1 chat" }

            } catch (error) {
                return { status: "error", error: error }
            }

        }
    }
    get = async() => {
        if (fs.existsSync(pathToChats)) {
            try {
                let data = await fs.promises.readFile(pathToChats, 'utf-8');
                let chats = JSON.parse(data);
                return { status: "success", payload: chats } //Payloads se usa para enviar info
            } catch (error) {
                return { status: "error", error: error }
            }
        } else {
            return { status: "success", payload: [] }
        }

    }

    findById = async(id) => {
        let data = await fs.promises.readFile(pathToChats, 'utf-8')
        let chats = JSON.parse(data);

        let chat = chats.find(p => p.id === id)
        if (chat) return { status: "sucess", payload: chat }
        else return { status: "error", message: "chat not found" }
    }


}
module.exports = ChatManager;