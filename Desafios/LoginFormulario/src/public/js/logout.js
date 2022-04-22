const socket = io();

socket.on('userDataLog', (data) => {
    const renderizar = () => {
        let html = ""
        html += ` 
        <h1>Esta página se redireccionará pronto... Gracias ${data.username} por tu visita</h1>
        `
        document.getElementById("logOutContainer").innerHTML = html
    }
    renderizar();

})