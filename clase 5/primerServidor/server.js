const http = require('http');
const server = http.createServer((request, response) => {
    let currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime <= 12) response.end("¡Buenos días!")
    if (currentTime >= 13 && currentTime <= 19) response.end("Buenas tardes")
    else response.end("Buenas noches")
    console.log(currentTime);
    response.end("Hola mundo desde el maravilloso Backend");
})
const connectedServer = server.listen(8080, () => {
    console.log("Server listening on port 8080");
})