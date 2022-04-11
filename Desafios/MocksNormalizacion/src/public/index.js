const socket = io();
let userData = document.getElementById("userForm");
userData.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let data = new FormData(userData);
    let sendObj = {};
    data.forEach((val, key) => sendObj[key] = val);
    socket.emit("sendUser", sendObj);
    userData.reset();

});

socket.on('productLog', (data) => {
    let products = data.payload;
    let productsTemplate = document.getElementById("productsTemplate");
    fetch('templates/newestProducts.handlebars').then(response => {
        return response.text();
    }).then(template => {
        const processedTemplate = Handlebars.compile(template);
        const html = processedTemplate({ products })
        productsTemplate.innerHTML = html;
    })

})


//Sockets

socket.on('newUser', (data) => {

    Swal.fire({
        icon: "success",
        text: "Usuario nuevo conectado",
        toast: true,
        position: "top-right"
    });
})

let nickname;
socket.on('userLog', (data) => {
    nickname = data;
})

chatBox.addEventListener('keyup', (evt) => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) { // Trim saca espacios
            socket.emit('message', { nickname: nickname, message: chatBox.value.trim() })
            chatBox.value = "";
        }
    }
})

socket.on('log', data => {
    let log = document.getElementById('log');
    let messages = "";
    data.forEach(message => {
        messages = messages + `${message.nickname} dice: ${message.message}<br/>`
    })
    log.innerHTML = messages;
});