const { MODE, PORT, USERNAME } = require('./config');

console.log(`MODE, PORT: ${MODE}, ${PORT}`); // MODE, PORT: pruebas, 8080
console.log(process.env)
console.log(`Username from env: ${USERNAME}`); // Username from env: pepe