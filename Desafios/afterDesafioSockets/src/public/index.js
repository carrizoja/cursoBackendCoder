const socket = io();
let form = document.getElementById("petForm");
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let data = new FormData(form);
    let sendObj = {};
    data.forEach((val, key) => sendObj[key] = val);
    socket.emit("sendPet", sendObj);
    form.reset();


});

socket.on('petLog', (data) => {
    let pets = data.payload;
    let petsTemplate = document.getElementById("petsTemplate");
    fetch('templates/newestPets.handlebars').then(response => {
        return response.text();
    }).then(template => {
        const processedTemplate = Handlebars.compile(template);
        const html = processedTemplate({ pets })
        petsTemplate.innerHTML = html;
    })

})