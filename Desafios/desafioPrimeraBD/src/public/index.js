const socket = io();
let form = document.getElementById("productForm");
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let data = new FormData(form);
    let sendObj = {};
    data.forEach((val, key) => sendObj[key] = val);
    socket.emit("sendProduct", sendObj);
    form.reset();


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


// Chatbox

/* const socket = io(); */
let user;
let chatBox = document.getElementById('chatBox');
Swal.fire({
    title: "Identifícate",
    input: "text",
    text: "Ingresa el nombre de usuario que utilizarás en el chat",
    inputValidator: (value) => {
        return !value && "¡Necesitas identificarte para poder usar el chat!"
    },
    allowOutsideClick: false

}).then(result => {
    user = result.value;
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

chatBox.addEventListener('keyup', (evt) => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) { // Trim saca espacios
            socket.emit('message', { user: user, message: chatBox.value.trim() })
            chatBox.value = "";
        }


    }
})

socket.on('log', data => {
    let log = document.getElementById('log');
    let messages = "";
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message}<br/>`
    })
    log.innerHTML = messages;
});