const socket = io();
let chatBox = document.getElementById('chatBox');

chatBox.addEventListener('keyup', (evt) => {
    if (evt.key === "Enter") {
        socket.emit('message', chatBox.value);
    }
    // Emitir algo al servidor. Se pone un evento dentro de la función
    // Luego va la info que se está colocando en el input
    // Por cada emit va un On
})

socket.on('history', data => {
    let history = document.getElementById('history')
    let messages = "";
    data.forEach(message => {
        messages = messages + `${message.userId} dice ${message.message}</br>`
    })
    history.innerHTML = messages;
    chatBox.value = "";

})