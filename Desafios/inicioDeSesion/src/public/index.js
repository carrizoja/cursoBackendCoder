const socket = io();
let username;
let userData = document.getElementById("userForm");
userData.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let data = new FormData(userData);
    let sendObj = {};
    data.forEach((val, key) => sendObj[key] = val);
    socket.emit("sendUser", sendObj);
    userData.reset();

});

fetch('/profNameDisabled').then(res => res.json()).then(data => {
    let username = data.username
    console.log(username);
    const renderizar = () => {
        let html = ""
        html += ` 
        <input class="buttonLogOutStyle" type="submit" value="Logout ${username} " id="logOutButton">
        `
        document.getElementById("logOutForm").innerHTML = html
    }
    renderizar();

})

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
        messages = messages + `${username} dice: ${message.message}<br/>`
    })
    log.innerHTML = messages;
});

socket.on('normalizedData', data => {
    let log = document.getElementById('log');
    // denormalization process with normalizr
    const author = new normalizr.schema.Entity('author');
    const mesagges = new normalizr.schema.Entity('mesagges', {
        author: author,
    });
    let denormalizedData = new normalizr.denormalize(data.result, [mesagges], data.entities);
    console.log(`Longitud total de la data normalizada: ${JSON.stringify(data,null,'\t').length}`);
    console.log(`Porcentaje de reducción: ${(JSON.stringify(mesagges,null,'\t').length - JSON.stringify(data,null,'\t').length)/JSON.stringify(mesagges,null,'\t').length*100}%`)

})